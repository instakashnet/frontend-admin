import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row, Spinner } from "reactstrap";
import { getCbAccounts, getOpenedStatusInit, updateBalance, updateOpenedStatusInit } from "../../store/actions";

import AccountsTable from "./components/accounts-table.component";
import AddAccount from "./components/forms/add-account.component";
import EditAccount from "./components/forms/edit-account.component";
import EditBalance from "./components/forms/edit-balance.component";

export const BankAccountsScreen = () => {
  const [formType, setFormType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const dispatch = useDispatch();
  const { accounts, isLoading, isProcessing, activeBalance } = useSelector((state) => state.BankAccounts);
  const { opened, isProcessing: statusProcessing } = useSelector((state) => state.AdminUsers);

  useEffect(() => {
    dispatch(getCbAccounts());
    dispatch(getOpenedStatusInit());
  }, [dispatch]);

  let FormComponent;

  // HANDLERS

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

  if (formType === "add") FormComponent = <AddAccount onHideForm={hideFormHandler} />;
  if (formType === "balance") FormComponent = <EditBalance onHideForm={hideFormHandler} accId={selectedAccount && selectedAccount.id} isProcessing={isProcessing} />;
  if (formType === "edit") FormComponent = <EditAccount onHideForm={hideFormHandler} account={selectedAccount} isProcessing={isProcessing} />;

  return (
    <div className="page-content">
      <Container fluid>
        <Button type="button" color="secondary" className="mb-3 ml-3" onClick={() => dispatch(updateBalance(activeBalance))}>
          {isProcessing || isLoading ? <Spinner size="sm" /> : !activeBalance ? "Desactivar saldo" : "Activar saldo real"}
        </Button>
        <Button type="button" color={!opened ? "success" : "danger"} className="mb-3 ml-3" onClick={() => dispatch(updateOpenedStatusInit(!opened))}>
          {statusProcessing || isLoading ? <Spinner size="sm" /> : !opened ? "Abrir casa de cambio" : "Cerrar casa de cambio"}
        </Button>
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
