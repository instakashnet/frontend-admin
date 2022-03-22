import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Col, Row, Container } from "reactstrap";

// REDUX
import { useSelector } from "react-redux";
import { setAlert } from "../../../store/actions";

// HELPERS
import { formatOrders } from "../../../helpers/functions";
import { exchangesColumns } from "../../../helpers/tables/columns";

// COMPONENTS
import { Table } from "../../../components/UI/tables/table.component";

const PAGE_SIZE = 50;
const WS_URL = process.env.REACT_APP_STAGE === "prod" ? "wss://ws.instakash.net" : "wss://ws.dev.instakash.net";

export const RecentExchangesScreen = () => {
  const websocket = useRef(null),
    [isLoading, setIsLoading] = useState(true),
    [data, setData] = useState([]),
    { token } = useSelector((state) => state.Login);

  useEffect(() => {
    websocket.current = new WebSocket(`${WS_URL}/ws?token=${token}&service=orders`);

    websocket.current.onopen = () => console.log("WebSocket connection established.");

    websocket.current.onclose = () => {
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
        orders = formatOrders(JSON.parse(data.data), "orders");

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
