import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCbAccounts, getBanks, getCurrenciesInit } from "../../store/actions";
import { Container, Col, Row, Alert } from "reactstrap";

import AccountsTable from "./AccountsTable";
import AddAccount from "./AddAccount";
import EditBalance from "./EditBalance";

const BankAccounts = () => {
  const [addState, setAddState] = useState(false);
  const [addBalance, setAddBalance] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const dispatch = useDispatch();
  const { accounts, isLoading, isProcessing, error } = useSelector((state) => state.BankAccounts);

  const addAccountHandler = () => {
    setAddBalance(false);
    setAddState(true);
  };

  const addBalanceHandler = (accountData) => {
    setAddState(false);
    setSelectedAccount(accountData);
    setAddBalance(true);
  };

  useEffect(() => {
    dispatch(getCbAccounts());
    dispatch(getBanks());
    dispatch(getCurrenciesInit());
  }, [dispatch]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='8'>
            <AccountsTable isLoading={isLoading} accounts={accounts} onAdd={addAccountHandler} onAddBalance={addBalanceHandler} />
          </Col>
          <Col lg='4'>
            {error && <Alert color='danger'>{error}</Alert>}
            {addState && <AddAccount setAddState={setAddState} />}
            {addBalance && <EditBalance {...selectedAccount} isProcessing={isProcessing} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BankAccounts;
