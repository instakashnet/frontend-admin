import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Edit } from "@material-ui/icons";
import { getExchangeDetails, createInvoice, approveExchange, validateExchange, declineExchange } from "../../../store/actions";
import { Container, Row, Col, Badge, Modal, ModalBody, ModalHeader } from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";

import UserInfo from "../components/details/user-details.component";
import Received from "../components/details/exchange/received-details.component";
import ToSend from "../components/details/exchange/to-send-details.component";
import OldTransacions from "../components/details/exchange/old-transactions.component";
import CompleteOrder from "../components/forms/complete-order.component";
import EditOrder from "../components/forms/edit-order.component";
import ReassignOrder from "../components/forms/reassign-order.component";
import SetRevision from "../components/forms/set-revision.component";
import LoadingPage from "../../LoadingPage";
import { ActionButtons } from "../components/details/action-buttons.component";

export const ExchangeDetailsScreen = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = props.match.params;
  const [modal, setModal] = useState(false);
  const [formType, setFormType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [revision, setRevision] = useState(false);
  const { details, isLoading, isProcessing } = useSelector((state) => state.CurrencyExchange);

  const { exchanges, isLoading: dataLoading } = useSelector((state) => state.Clients);

  const showFormHandler = (formType = null) => {
    setShowForm((prev) => !prev);
    setFormType(formType);
  };

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

  let FormComponent;

  if (formType === "edit") FormComponent = <EditOrder details={details} onShowForm={setShowForm} />;
  if (formType === "reassign") FormComponent = <ReassignOrder details={details} onShowForm={setShowForm} isProcessing={isProcessing} />;

  return (
    <div className="page-content">
      <Container fluid>
        {(isLoading || dataLoading) && <LoadingPage />}
        {!isLoading && !dataLoading && (
          <>
            <Breadcrumbs title="Detalles del cambio" breadcrumbItem="Detalles del cambio de divisa" />
            <Row>
              <Col lg="8">
                {details && (
                  <ActionButtons
                    goBack={() => history.goBack()}
                    statusId={details.stateId}
                    billCreated={details.billAssigned}
                    onDecline={onDeclineExchange}
                    onCreateInvoice={onCreateInvoice}
                    onChangeStatus={changeStatusHandler}
                    isProcessing={isProcessing}
                    hasInvoice
                  />
                )}
                <UserInfo details={details} isLoading={isLoading} />
              </Col>
              {(details.stateId === 3 || details.stateId === 4) && (
                <Col lg="4">{(revision || details.orderNotes) && <SetRevision note={details.orderNotes} isProcessing={isProcessing} setRevision={setRevision} orderId={id} />}</Col>
              )}
            </Row>
            <Row className="mb-3">
              <Col lg="8" className="d-flex flex-wrap justify-content-between items-center">
                {details && (
                  <Badge className="py-2 font-size-15 w-full max-w-xs" style={{ color: "#fff", backgroundColor: details.stateColor }}>
                    {`${details.stateNme} ${details.orderNotes ? " - EN REVISIÓN" : ""}`}
                  </Badge>
                )}
                {details && (
                  <div className="flex flex-col items-end">
                    <p className="mb-2">
                      <span className="text-muted mr-1">Operador asignado: </span> {details.operatorName || "Sin asignar"}
                    </p>
                    {(details.stateId === 3 || details.stateId === 4) && (
                      <button type="button" className="mt-1 border-2 border-gray-400 py-2 px-4 text-sm rounded-md" onClick={() => setRevision((prev) => !prev)}>
                        <Edit fontSize="small" className="mr-1" /> {details.orderNotes ? "Editar" : "Agregar"} revisión
                      </button>
                    )}
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg="5" xl="4">
                <ToSend details={details} onShowForm={showFormHandler} isLoading={isLoading} />
              </Col>
              <Col lg="5" xl="4">
                <Received details={details} onShowForm={showFormHandler} isProcessing={isProcessing} isLoading={isLoading} />
              </Col>
              {showForm && <Col lg="5">{FormComponent}</Col>}
            </Row>
            <Row>
              <Col lg="10" xl="8">
                <OldTransacions isLoading={dataLoading} details={details} orders={exchanges} />
              </Col>
            </Row>
          </>
        )}
      </Container>
      <Modal isOpen={modal} role="dialog" autoFocus={true} centered={true} tabIndex="-1" toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Adjunta el comprobante de pago</ModalHeader>
        <ModalBody>
          <CompleteOrder isProcessing={isProcessing} orderId={id} onApprove={onApproveExchange} />
        </ModalBody>
      </Modal>
    </div>
  );
};
