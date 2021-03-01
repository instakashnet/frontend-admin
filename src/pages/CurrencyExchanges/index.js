import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getExchangesSuccess } from "../../store/actions";

import Transactions from "./Transactions";

const CurrencyExchanges = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const orders = useSelector((state) => state.CurrencyExchange.orders);
  const token = useSelector((state) => state.Login.token);
  const socket = useSelector((state) => state.Socket.socket);

  useEffect(() => {
    socket.emit("joinGroup", { data: token });
    socket.on("joinedGroup", () => {
      socket.emit("getOrders", { token, type: "SUBSCRIBE" });
    });

    return () => socket.emit("disconnect", { data: token });
  }, [socket, token]);

  useEffect(() => {
    socket.on("ordersTo", (orders) => {
      console.log(orders);
      dispatch(getExchangesSuccess(orders));

      setIsLoading(false);
    });
  }, [socket, dispatch]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='12'>
            <Transactions orders={orders} isLoading={isLoading} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CurrencyExchanges;
