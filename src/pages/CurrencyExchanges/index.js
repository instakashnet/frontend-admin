import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
// import { joinGroup } from "../../store/actions";

import Transactions from "./Transactions";

const CurrencyExchanges = () => {
  // const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.CurrencyExchange);
  // const token = useSelector((state) => state.Login.token);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='12'>
            {/* <Button className='btn-primary mb-2 ml-2' onClick={() => dispatch(joinGroup(token))}>
              Actualizar operaciones
            </Button> */}
            <Transactions orders={orders} isLoading={isLoading} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CurrencyExchanges;
