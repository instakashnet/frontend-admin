import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";

import Transactions from "./Transactions";

const CurrencyExchanges = () => {
  const { orders, isLoading } = useSelector((state) => state.CurrencyExchange);

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
