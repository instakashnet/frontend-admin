import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCbAccounts, closeBalance } from "../../store/actions";
import { Container, Col, Row, Button, Modal, ModalBody, Spinner } from "reactstrap";

import AccountsTable from "./components/accounts-table.component";
import { ClosedBalances } from "./components/closed-balances.component";
import AddAccount from "./components/forms/add-account.component";
import EditAccount from "./components/forms/edit-account.component";
import EditBalance from "./components/forms/edit-balance.component";

export const BankAccountsScreen = () => {
  const [formType, setFormType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const dispatch = useDispatch();
  const { accounts, isLoading, isProcessing, closedBalances } = useSelector((state) => state.BankAccounts);

  useEffect(() => {
    dispatch(getCbAccounts());
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

  const openModal = () => setModal(true);

  if (formType === "add") FormComponent = <AddAccount onHideForm={hideFormHandler} />;
  if (formType === "balance") FormComponent = <EditBalance onHideForm={hideFormHandler} accId={selectedAccount && selectedAccount.id} isProcessing={isProcessing} />;
  if (formType === "edit") FormComponent = <EditAccount onHideForm={hideFormHandler} account={selectedAccount} isProcessing={isProcessing} />;

  return (
    <div className="page-content">
      <Container fluid>
        <Button type="button" className="mb-3 ml-3 btn-primary" onClick={() => dispatch(closeBalance(openModal))}>
          {isProcessing ? <Spinner size="sm" /> : "Cerrar saldos actuales"}
        </Button>
        <Row>
          <Col lg="8">
            <AccountsTable isLoading={isLoading} accounts={accounts} onShowForm={showFormHandler} />
          </Col>
          <Col lg="4">{showForm && FormComponent}</Col>
        </Row>
      </Container>
      <Modal isOpen={modal} role="dialog" autoFocus centered tabIndex="-1" toggle={() => setModal(false)}>
        <ModalBody>
          <ClosedBalances closedBalances={closedBalances} />
        </ModalBody>
      </Modal>
    </div>
  );
};
