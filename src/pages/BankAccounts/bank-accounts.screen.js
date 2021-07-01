import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCbAccounts, getBanks, getCurrenciesInit } from "../../store/actions";
import { Container, Col, Row } from "reactstrap";

import AccountsTable from "./components/accounts-table.component";
import AddAccount from "./components/forms/add-account.component";
import EditAccount from "./components/forms/edit-account.component";
import EditBalance from "./components/forms/edit-balance.component";

export const BankAccountsScreen = () => {
  const [formType, setFormType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const dispatch = useDispatch();
  const { accounts, isLoading, isProcessing } = useSelector((state) => state.BankAccounts);

  const showFormHandler = (formType, accData = null) => {
    setSelectedAccount(accData);
    setFormType(formType);
    setShowForm(true);
  };

  const hideFormHandler = () => {
    setSelectedAccount(null);
    setFormType("");
    setShowForm(false);
  };

  useEffect(() => {
    dispatch(getCbAccounts());
    dispatch(getBanks());
    dispatch(getCurrenciesInit());
  }, [dispatch]);

  let FormComponent;

  if (formType === "add") FormComponent = <AddAccount onHideForm={hideFormHandler} />;
  if (formType === "balance") FormComponent = <EditBalance onHideForm={hideFormHandler} accId={selectedAccount && selectedAccount.id} isProcessing={isProcessing} />;
  if (formType === "edit") FormComponent = <EditAccount onHideForm={hideFormHandler} account={selectedAccount} isProcessing={isProcessing} />;

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="8">
            <AccountsTable isLoading={isLoading} accounts={accounts} onShowForm={showFormHandler} />
          </Col>
          <Col lg="4">{showForm && FormComponent}</Col>
        </Row>
      </Container>
    </div>
  );
};
