import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
// CUSTOM HOOKS
import { useRole } from "../../../hooks/useRole";
// REDUX ACTIONS
import {
  approveExchange,
  changeOrderStatus,
  createInvoice,
  declineExchange,
  getClientExchanges,
  getExchangeDetails,
  setRevisionInit,
  validateExchange,
} from "../../../store/actions";
// COMPONENTS
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { ActionButtons } from "../components/details/action-buttons.component";
import Received from "../components/details/exchange/received.component";
import { StatusInfo } from "../components/details/exchange/status.component";
import ToSend from "../components/details/exchange/to-send.component";
import { UserTransactions } from "../components/details/exchange/user-transactions.component";
import { RevisionNote } from "../components/details/revision-note.component";
import UserInfo from "../components/details/user-details.component";
import CompleteOrder from "../components/forms/complete-order.component";
import EditOrder from "../components/forms/edit-order.component";
import ReassignOrder from "../components/forms/reassign-order.component";
import SetRevision from "../components/forms/set-revision.component";

export const ExchangeDetailsScreen = (props) => {
  // VARIABLES & HOOKS
  const { id } = props.match.params;
  const { details, isLoading, isProcessing } = useSelector((state) => state.CurrencyExchange);
  const { exchanges, isLoading: dataLoading } = useSelector((state) => state.Clients);
  const user = useSelector((state) => state.Login.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [formType, setFormType] = useState(null);
  const [orderItemEdit, setOrderItemEdit] = useState("");
  const [role] = useRole(user);

  // HANDLERS
  const showFormHandler = (formType = null, orderItemEdit = "") => {
    setModal((prev) => !prev);
    setFormType(formType);
    setOrderItemEdit(orderItemEdit);
  };

  const changeStatusHandler = useCallback(
    (status, type = null) => {
      if (type === "change") return dispatch(changeOrderStatus(details.id, status));

      switch (status) {
        case 4:
          return dispatch(validateExchange(details.id, history));
        case 5:
          return dispatch(declineExchange(details.id, history));
        case 6:
          return showFormHandler("complete");
        default:
          break;
      }
    },
    [details, dispatch, history]
  );
  const onApproveExchange = (values) => dispatch(approveExchange(id, values, showFormHandler));
  const onCreateInvoice = () => dispatch(createInvoice(id));
  const onSetReview = () => {
    let valuesRevision = {
      note: details.orderNotes,
      inReview: !details.inReview,
    };

    dispatch(setRevisionInit(valuesRevision, id));
  };

  // EFFECTS
  useEffect(() => {
    dispatch(getExchangeDetails(id));
  }, [dispatch, id]);

  let FormComponent;

  if (formType === "edit") FormComponent = <EditOrder details={details} isProcessing={isProcessing} onShowForm={showFormHandler} orderItemToEdit={orderItemEdit} />;
  if (formType === "reassign") FormComponent = <ReassignOrder details={details} onShowForm={showFormHandler} isProcessing={isProcessing} />;
  if (formType === "complete") FormComponent = <CompleteOrder isProcessing={isProcessing} orderId={id} onShowForm={showFormHandler} onApprove={onApproveExchange} />;
  if (formType === "revision")
    FormComponent = <SetRevision note={details.orderNotes} inReview={details.inReview} isProcessing={isProcessing} onShowForm={showFormHandler} orderId={id} />;

  return (
    <div className="relative">
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Detalles del cambio" breadcrumbItem="Detalles del cambio de divisa" />
          <Row>
            <Col lg="8">
              <ActionButtons
                goBack={() => history.goBack()}
                statusId={details.stateInfo?.stateId}
                billCreated={details.billInfo?.billAssigned}
                onCreateInvoice={onCreateInvoice}
                onChangeStatus={changeStatusHandler}
                isProcessing={isProcessing}
                role={role}
                hasInvoice
              />
              {details.userInfo && <UserInfo user={details.userInfo} role={role} isLoading={isLoading} />}
            </Col>
            {details.orderNotes && (
              <Col lg="4">
                <RevisionNote note={details.orderNotes} onEdit={() => showFormHandler("revision")} />
              </Col>
            )}
          </Row>
          <StatusInfo
            onShowForm={() => showFormHandler("revision")}
            status={details.stateInfo}
            operator={details.operatorInfo}
            inReview={details.inReview}
            note={details.orderNotes}
            isProcessing={isProcessing}
            isLoading={isLoading}
            onSetReview={onSetReview}
          />

          <Row>
            <Received details={details} onShowForm={showFormHandler} isLoading={isLoading} />
            <ToSend details={details} isLoading={isLoading} isProcessing={isProcessing} onShowForm={showFormHandler} />
          </Row>
          <Row>
            <Col lg="10" xl="8">
              <UserTransactions getTransactions={() => dispatch(getClientExchanges(details.userInfo?.userId))} isLoading={dataLoading || isLoading} orders={exchanges} />
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
