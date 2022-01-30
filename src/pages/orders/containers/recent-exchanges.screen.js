import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Col, Row, Container } from "reactstrap";
import camelize from "camelize";

// REDUX
import { useSelector } from "react-redux";
import { setAlert } from "../../../store/actions";

// HELPERS
import { formatOrders } from "../../../helpers/functions";
import { exchangesColumns } from "../../../helpers/tables/columns";

// COMPONENTS
import { Table } from "../../../components/UI/tables/table.component";

const PAGE_SIZE = 50;

export const RecentExchangesScreen = () => {
  const websocket = useRef(null),
    [isLoading, setIsLoading] = useState(true),
    [data, setData] = useState([]),
    { token } = useSelector((state) => state.Login);

  useEffect(() => {
    websocket.current = new WebSocket(`wss://ws.dev.instakash.net/ws?token=${token}`);

    websocket.current.onopen = (event) => console.log("WebSocket connection established.");

    websocket.current.onclose = (event) => {
      console.log("connection closed.");
      setIsLoading(false);
    };

    websocket.current.onerror = (event) => {
      setAlert("error", "Ha ocurrido un error inesperado obteniendo la lista de ordenes. Intenta de nuevo o contacta a soporte.");
      console.log("connection error received: ", event);
      setIsLoading(false);
    };

    return () => websocket.current.close();
  }, [token]);

  useEffect(() => {
    websocket.current.onmessage = (event) => {
      setIsLoading(true);

      const data = JSON.parse(event.data),
        ordersData = camelize(JSON.parse(data.data)),
        orders = formatOrders(ordersData, "orders");

      setData(orders);
      setIsLoading(false);
    };
  });

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <Table title="Ordenes recibidas" columns={exchangesColumns} data={data} isLoading={isLoading} pagination={{ pageSize: PAGE_SIZE, async: false }} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
