import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCbAccounts, getBanks, getCurrenciesInit } from "../../store/actions";
import { Container, Col, Row, Alert } from "reactstrap";

import AccountsTable from "./AccountsTable";
import AddAccount from "./AddAccount";
import EditAccount from "./EditAccount";
import EditBalance from "./EditBalance";

const BankAccounts = () => {
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [addBalance, setAddBalance] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const dispatch = useDispatch();
  const { accounts, isLoading, isProcessing, error } = useSelector((state) => state.BankAccounts);

  const addAccountHandler = () => {
    setAddBalance(false);
    setAddState(true);
  };

  const addBalanceHandler = (accData) => {
    setAddState(false);
    setSelectedAccount(accData);
    setAddBalance(true);
  };

  const editAccountHandler = (accData) => {
    setAddState(false);
    setAddBalance(false);
    setSelectedAccount(accData);
    setEditState(true);
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
            <AccountsTable isLoading={isLoading} accounts={accounts} onAdd={addAccountHandler} onAddBalance={addBalanceHandler} onEdit={editAccountHandler} />
          </Col>
          <Col lg='4'>
            {error && <Alert color='danger'>{error}</Alert>}
            {addState && <AddAccount setAddState={setAddState} />}
            {editState && <EditAccount setEditState={setEditState} account={selectedAccount} isProcessing={isProcessing} />}
            {addBalance && <EditBalance setAddState={setAddBalance} accId={selectedAccount.id} isProcessing={isProcessing} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BankAccounts;
