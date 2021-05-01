import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Modal, Button, ModalBody, ModalHeader, ModalFooter, Alert } from "reactstrap";

import Transactions from "./Transactions";
import TransactionDetails from "./TransactionDetails";

const CashAdvances = (props) => {
  const [modal, setModal] = useState(false);
  const [trxId, setTrxId] = useState(null);
  const tableRef = useRef();

  const { cashAdvances, isLoading, isProcessing, user, connection } = props;

  let role = null;
  if (user) role = user.idRol;

  const updateTable = () => (tableRef.current ? tableRef.current.onQueryChange() : false);

  useEffect(() => {
    if (!role) return;

    if (connection) {
      let connectionString = role === 3 ? "NotificarAnalistaAE" : role === 2 ? "NotificarOperadorAE" : "NotificarAdminAE";
      connection.on(connectionString, () => updateTable());
    }
  }, [role, connection]);

  const togglemodal = (trxId) => {
    setModal((prevState) => !prevState);
    setTrxId(trxId);
  };

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          <Row>
            <Col lg='12'>
              <Transactions ref={tableRef} data={cashAdvances} openModal={togglemodal} />
            </Col>
          </Row>
        </Container>
      </div>
      <Modal size='xl' isOpen={modal} role='dialog' autoFocus={true} centered={true} className='exampleModal' tabIndex='-1' toggle={togglemodal}>
        <div className='modal-content'>
          <ModalHeader toggle={togglemodal}>Detalles de la transacción</ModalHeader>
          <ModalBody className='py-0'>
            <TransactionDetails close={togglemodal} connection={connection} isLoading={isLoading} isProcessing={isProcessing} id={trxId} />
            <Col md='6' style={{ marginLeft: 0, marginTop: 10 }}>
              {props.error ? <Alert color='danger'>{props.error}</Alert> : null}
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button type='button' color='secondary' onClick={togglemodal}>
              Cerrar
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  const { cashAdvances, error, isLoading, isProcessing } = state.CashAdvance;
  const { user } = state.Login;
  const { connection } = state.HubConnection;
  return { cashAdvances, error, isLoading, isProcessing, user, connection };
};

export default connect(mapStateToProps)(CashAdvances);
