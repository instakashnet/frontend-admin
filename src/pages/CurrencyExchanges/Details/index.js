import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getExchangeDetails, createInvoice, approveExchange, validateExchange, declineExchange } from "../../../store/actions";
import { Container, Row, Col, Badge, Modal, ModalBody, ModalHeader } from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import User from "./User";
import Received from "./Received";
import Sent from "./Sent";
import Transactions from "./OldTransactions";
import TransferInvoice from "./TransferInvoice";
import EditTransaction from "./EditTransaction";
import Alert from "../../../components/UI/Alert";

const ExchangeDetails = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = props.match.params;
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const { details, isLoading, isProcessing, error, success } = useSelector((state) => state.CurrencyExchange);
  const user = useSelector((state) => state.Login.user);

  const { exchanges, isLoading: dataLoading } = useSelector((state) => state.Clients);

  const editStateHandler = () => setEdit((prev) => !prev);

  const toggleModal = () => setModal((prev) => !prev);

  const changeStatusHandler = () => {
    if (details.stateId === 3) return dispatch(validateExchange(details.id, history));
    setModal(true);
  };
  const onDeclineExchange = () => dispatch(declineExchange(details.id, history));
  const onApproveExchange = (values) => dispatch(approveExchange(id, values, toggleModal));
  const onCreateInvoice = () => dispatch(createInvoice(id));

  useEffect(() => {
    dispatch(getExchangeDetails(id));
  }, [dispatch, id]);

  return (
    <div className='page-content'>
      <Container fluid>
        {error && <Alert color='danger' error={error} />}
        {success && <Alert color='success' error={success} />}
        <Breadcrumbs title='Detalles del cambio' breadcrumbItem='Detalles del cambio de divisa' />
        <Row>
          <Col lg='10' xl='8'>
            <div className='d-flex align-items-center justify-content-between'>
              <button type='button' onClick={() => history.push("/currency-exchanges/recent-orders")} className='btn btn-blue waves-effect btn-label waves-light'>
                <i className='fas fa-arrow-left label-icon'></i> Regresar
              </button>
              <div>
                {details && (details.stateId === 3 || details.stateId === 4) && user.role !== "ROLE_OPERATOR" && (
                  <button type='button' disabled={isProcessing} onClick={onDeclineExchange} className='btn btn-danger waves-effect btn-label mr-3 waves-light'>
                    <i className='fas fa-times label-icon'></i> Cancelar
                  </button>
                )}
                {details && (details.stateId === 3 || details.stateId === 4) && (
                  <button type='button' disabled={isProcessing} onClick={changeStatusHandler} className='btn btn-primary waves-effect btn-label waves-light'>
                    <i className='fas fa-check label-icon'></i> {details.stateId === 3 ? "Validar" : "Aprobar"}
                  </button>
                )}
                {details && details.stateId === 6 && !details.billAssigned && (
                  <button type='button' disabled={isProcessing} onClick={onCreateInvoice} className='btn btn-primary waves-effect btn-label waves-light'>
                    <i className='fas fa-file-invoice label-icon'></i> Generar factura
                  </button>
                )}
              </div>
            </div>
            <User details={details} isLoading={isLoading} />
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col lg='10' xl='8' className='d-flex justify-content-end'>
            {details && (
              <Badge className='py-2 font-size-15 px-5' style={{ color: "#fff", backgroundColor: details.stateColor }}>
                {details.stateNme}
              </Badge>
            )}
          </Col>
        </Row>
        <Row>
          <Col lg='5' xl='4'>
            <Sent details={details} onEdiState={editStateHandler} isLoading={isLoading} />
          </Col>
          <Col lg='5' xl='4'>
            <Received details={details} isLoading={isLoading} />
          </Col>
          {edit && (
            <Col lg='4'>
              <EditTransaction details={details} setEditState={setEdit} />
            </Col>
          )}
        </Row>
        <Row>
          <Col lg='10' xl='8'>
            <Transactions isLoading={dataLoading} details={details} orders={exchanges} />
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} role='dialog' autoFocus={true} centered={true} tabIndex='-1' toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Adjunta el comprobante de pago</ModalHeader>
        <ModalBody>
          <TransferInvoice isProcessing={isProcessing} orderId={id} onApprove={onApproveExchange} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ExchangeDetails;
