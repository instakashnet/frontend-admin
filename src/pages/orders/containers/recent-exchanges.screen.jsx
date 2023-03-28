import React, { useEffect, useRef, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { useRole } from '../../../hooks/useRole';
import { changeStatusInit, setAlert } from '../../../store/actions';

// HELPERS
import { formatOrders } from '../../../helpers/functions';
import { exchangesColumns } from '../../../helpers/tables/columns';

// COMPONENTS
import { Table } from '../../../components/UI/tables/table.component';

const PAGE_SIZE = 50;
const WS_URL = process.env.REACT_APP_STAGE === 'prod' ? 'wss://ws.instakash.net' : 'wss://ws.dev.instakash.net';

export const RecentExchangesScreen = () => {
  const websocket = useRef(null),
    dispatch = useDispatch(),
    [isLoading, setIsLoading] = useState(true),
    [data, setData] = useState([]),
    { token } = useSelector((state) => state.Login),
    user = useSelector((state) => state.Login.user),
    [role] = useRole(user);

  useEffect(() => {
    websocket.current = new WebSocket(`${WS_URL}/ws?token=${token}&service=orders`);

    websocket.current.onopen = () => {
      console.log('WebSocket connection established.');
    };

    websocket.current.onclose = () => {
      console.log('connection closed.');
      setIsLoading(false);
    };

    websocket.current.onerror = (event) => {
      setAlert('error', 'Ha ocurrido un error inesperado obteniendo la lista de ordenes. Intenta de nuevo o contacta a soporte.');
      console.log('connection error received: ', event);
      setIsLoading(false);
    };

    return () => websocket.current.close();
  }, [token]);

  useEffect(() => {
    websocket.current.onmessage = ({ data }) => {
      setIsLoading(true);

      const parsedData = JSON.parse(data);
      console.log(JSON.parse(parsedData.data));
      const orders = formatOrders(JSON.parse(parsedData.data), 'orders', role);

      setData(orders);
      setIsLoading(false);
    };
  });

  const onChangeStatus = (orderId, statusId) => dispatch(changeStatusInit(orderId, statusId));

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='12'>
            <Card>
              <CardBody>
                <div className='table-responsive'>
                  <Table
                    title='Ordenes recibidas'
                    columns={exchangesColumns({ onChangeStatus })}
                    data={data}
                    isLoading={isLoading}
                    pagination={{ pageSize: PAGE_SIZE, async: false }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
