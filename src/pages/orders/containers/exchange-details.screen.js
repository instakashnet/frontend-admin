import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Modal, ModalBody, ModalHeader } from "reactstrap";
import { getExchangeDetails, createInvoice, approveExchange, validateExchange, declineExchange } from "../../../store/actions";
import { useRole } from "../../../hooks/useRole";

import Breadcrumbs from "../../../components/Common/Breadcrumb";

import UserInfo from "../components/details/user-details.component";
import Received from "../components/details/exchange/received.component";
import ToSend from "../components/details/exchange/to-send.component";
import { UserTransactions } from "../components/details/exchange/user-transactions.component";
import { StatusInfo } from "../components/details/exchange/status.component";
import CompleteOrder from "../components/forms/complete-order.component";
import EditOrder from "../components/forms/edit-order.component";
import ReassignOrder from "../components/forms/reassign-order.component";
import SetRevision from "../components/forms/set-revision.component";
import { ActionButtons } from "../components/details/action-buttons.component";
import { RevisionNote } from "../components/details/revision-note.component";

export const ExchangeDetailsScreen = (props) => {
  const { id } = props.match.params;
  const { details, isLoading, isProcessing } = useSelector((state) => state.CurrencyExchange);
  const { exchanges, isLoading: dataLoading } = useSelector((state) => state.Clients);
  const user = useSelector((state) => state.Login.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [formType, setFormType] = useState(null);
  const [role] = useRole(user);

  const showFormHandler = (formType = null) => {
    setModal((prev) => !prev);
    setFormType(formType);
  };

  const changeStatusHandler = () => {
    if (details.stateId === 3) return dispatch(validateExchange(details.id, history));
    showFormHandler("complete");
  };
  const onDeclineExchange = () => dispatch(declineExchange(details.id, history));
  const onApproveExchange = (values) => dispatch(approveExchange(id, values, showFormHandler));
  const onCreateInvoice = () => dispatch(createInvoice(id));

  useEffect(() => {
    dispatch(getExchangeDetails(id));
  }, [dispatch, id]);

  let FormComponent;

  if (formType === "edit") FormComponent = <EditOrder details={details} isProcessing={isProcessing} onShowForm={showFormHandler} />;
  if (formType === "reassign") FormComponent = <ReassignOrder details={details} onShowForm={showFormHandler} isProcessing={isProcessing} />;
  if (formType === "complete") FormComponent = <CompleteOrder isProcessing={isProcessing} orderId={id} onShowForm={showFormHandler} onApprove={onApproveExchange} />;
  if (formType === "revision") FormComponent = <SetRevision note={details.orderNotes} isProcessing={isProcessing} onShowForm={showFormHandler} orderId={id} />;

  return (
    <div className="relative">
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Detalles del cambio" breadcrumbItem="Detalles del cambio de divisa" />
          <Row>
            <Col lg="8">
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
              <UserInfo user={details.user} role={role} isLoading={isLoading} />
            </Col>
            {details.orderNotes && (
              <Col lg="4">
                <RevisionNote note={details.orderNotes} onEdit={() => showFormHandler("revision")} />
              </Col>
            )}
          </Row>
          <StatusInfo onShowForm={() => showFormHandler("revision")} details={details} isLoading={isLoading} />

          <Row>
            <Received details={details} onShowForm={showFormHandler} isLoading={isLoading} />
            <ToSend details={details} isLoading={isLoading} isProcessing={isProcessing} onShowForm={showFormHandler} />
          </Row>
          <Row>
            <Col lg="10" xl="8">
              <UserTransactions isLoading={dataLoading} orders={exchanges} />
            </Col>
          </Row>
        </Container>
      </div>
      <Modal isOpen={modal} role="dialog" autoFocus centered tabIndex="-1" toggle={showFormHandler}>
        <ModalHeader toggle={showFormHandler}>Formulario</ModalHeader>
        <ModalBody>{FormComponent}</ModalBody>
      </Modal>
    </div>
  );
};
