import React, { useState } from "react";
import { Col, Row, Container, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { toggleBank } from "../../../store/actions";

import BanksTable from "./components/banks-table.component";
import AddBank from "./components/forms/add-bank.component";

export const BanksScreen = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [bankValues, setBankValues] = useState(null);

  const { isLoading, isProcessing, banks } = useSelector((state) => state.Banks);

  const onFormHandler = (selectedBank = null) => {
    let values = selectedBank;

    setShowForm(true);
    if (selectedBank) values = banks.find((bank) => bank.id === selectedBank.id);
    setBankValues(values);
  };

  const toggleBankHandler = (id, enabled) => dispatch(toggleBank(id, enabled));

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <BanksTable data={banks} isLoading={isLoading} isProcessing={isProcessing} onForm={onFormHandler} onToggle={toggleBankHandler} />
          </Col>
        </Row>
      </Container>

      <Modal isOpen={showForm} role="dialog" autoFocus centered tabIndex="-1" toggle={() => setShowForm((prev) => !prev)}>
        <ModalHeader>Banco</ModalHeader>
        <ModalBody>
          <AddBank isProcessing={isProcessing} closeModal={() => setShowForm(false)} bankValues={bankValues} />
        </ModalBody>
      </Modal>
    </div>
  );
};
