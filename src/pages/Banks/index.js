import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getBanks, getCurrenciesInit } from "../../store/actions";

import BanksTable from "./BanksTable";
import AddBank from "./AddBank";

const Banks = (props) => {
  const dispatch = useDispatch();
  const [addState, setAddState] = useState(false);

  const { isLoading, banks } = useSelector((state) => state.Banks);

  useEffect(() => {
    dispatch(getBanks());
    dispatch(getCurrenciesInit());
  }, [dispatch]);

  const addBankHandler = () => setAddState(true);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='8'>
            <BanksTable data={banks} isLoading={isLoading} onAdd={addBankHandler} />
          </Col>
          <Col lg='4'>{addState && <AddBank setAddState={setAddState} />}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banks;
