import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
// REDUX ACTIONS
import { changeWithdrawalStatusInit, getWithdrawalDetailsInit } from "../../../store/actions";
// COMPONENTS
import LoadingPage from "../../LoadingPage";
import { ActionButtons } from "../components/details/action-buttons.component";
import UserInfo from "../components/details/user-details.component";
import WithdrawalInfo from "../components/details/withdrawal/withdrawal-info.component";
import CompleteOrder from "../components/forms/complete-order.component";

export const WithdrawalDetailsScreen = ({ match, history }) => {
  // VARIABLES & HOOKS
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = match.params;

  const { details, isLoading, isProcessing } = useSelector((state) => state.Withdrawals);

  // EFFECTS
  useEffect(() => {
    dispatch(getWithdrawalDetailsInit(id));
  }, [dispatch, id]);

  // HANDLERS
  const toggleModal = () => setModal((prev) => !prev);

  const handleChangeStatus = (statusId, values = {}) => {
    if (statusId === 5) return dispatch(changeWithdrawalStatusInit(details.id, 5));

    setModal(true);
  };

  const approveWithdrawalHandler = (values) => dispatch(changeWithdrawalStatusInit(details.id, 6, values, toggleModal));

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="page-content">
      {details.user && (
        <Container fluid>
          <Row>
            <Col lg="8" xl="6">
              <ActionButtons goBack={() => history.goBack()} orderUuid={details.uuid} statusId={details.statusID} onChangeStatus={handleChangeStatus} isProcessing={isProcessing} />
              <UserInfo user={details.user} />
            </Col>
          </Row>
          <Row>
            <Col lg="8" xl="6" className="d-flex justify-content-end mb-3">
              <Badge className="py-2 font-size-15 px-5" style={{ color: "#fff", backgroundColor: details.statusColor }}>
                {details.statusName}
              </Badge>
            </Col>
          </Row>
          <Row>
            <Col lg="8" xl="6">
              <WithdrawalInfo details={details} isProcessing={isProcessing} />
            </Col>
          </Row>
        </Container>
      )}
      <Modal isOpen={modal} role="dialog" autoFocus={true} centered={true} tabIndex="-1" toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Adjunta el comprobante de pago</ModalHeader>
        <ModalBody>
          <CompleteOrder isProcessing={isProcessing} orderId={id} onApprove={approveWithdrawalHandler} />
        </ModalBody>
      </Modal>
    </div>
  );
};
