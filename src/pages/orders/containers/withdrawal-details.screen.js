import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Badge, Modal, ModalBody, ModalHeader } from "reactstrap";
import { getWithdrawalDetailsInit, changeWithdrawalStatusInit } from "../../../store/actions";

import UserInfo from "../components/details/user-details.component";
import WithdrawalInfo from "../components/details/withdrawal/withdrawal-info.component";
import LoadingPage from "../../LoadingPage";
import CompleteOrder from "../components/forms/complete-order.component";
import { ActionButtons } from "../components/details/action-buttons.component";

export const WithdrawalDetailsScreen = ({ match, history }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = match.params;

  const toggleModal = () => setModal((prev) => !prev);

  const { details, isLoading, isProcessing } = useSelector((state) => state.Withdrawals);

  useEffect(() => {
    dispatch(getWithdrawalDetailsInit(id));
  }, [dispatch, id]);

  const declineWithdrawalHandler = () => dispatch(changeWithdrawalStatusInit(details.id, 5));
  const approveWithdrawalHandler = (values) => dispatch(changeWithdrawalStatusInit(details.id, 6, values, toggleModal));

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="page-content">
      {details.user && (
        <Container fluid>
          <Row>
            <Col lg="8" xl="6">
              <ActionButtons
                goBack={() => history.goBack()}
                statusId={details.statusID}
                onDecline={declineWithdrawalHandler}
                onChangeStatus={() => setModal(true)}
                isProcessing={isProcessing}
              />
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
