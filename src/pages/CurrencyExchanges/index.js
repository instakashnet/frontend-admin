import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getExchanges } from "../../store/transactions/currencyExchange/actions";

import Transactions from "./Transactions";

const CurrencyExchanges = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.CurrencyExchange);
  const token = useSelector((state) => state.Login.token);

  useEffect(() => {
    dispatch(getExchanges(token));
  }, [dispatch, token]);

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
