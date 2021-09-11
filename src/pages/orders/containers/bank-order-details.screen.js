import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { getBankOrderDetails, changeBankOrderStatus } from "../../../store/actions";

import Breadcrumbs from "../../../components/Common/Breadcrumb";

import { ToSend } from "../components/details/bankOrders/to-send.component";
import { Received } from "../components/details/bankOrders/received.component";
import { ActionButtons } from "../components/details/action-buttons.component";
import { StatusInfo } from "../components/details/bankOrders/status.component";

export const BankOrderDetailsScreen = ({ match, history }) => {
  const { id } = match.params;
  const { bankOrderDetails, isLoading, isProcessing } = useSelector((state) => state.bankOrdersReducer);

  const dispatch = useDispatch();

  const onDeclineOrder = () => dispatch(changeBankOrderStatus(id, 5));
  const onApproveOrder = () => dispatch(changeBankOrderStatus(id, 6));

  useEffect(() => {
    dispatch(getBankOrderDetails(id));
  }, [dispatch, id]);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Detalles del pedido" breadcrumbItem="Detalles del pedido a caja" />
        <Row>
          <Col lg="8">
            <ActionButtons
              goBack={() => history.goBack()}
              statusId={bankOrderDetails.stateID}
              billCreated={bankOrderDetails.billAssigned}
              onDecline={onDeclineOrder}
              onChangeStatus={onApproveOrder}
              isProcessing={isProcessing}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <StatusInfo details={bankOrderDetails} isLoading={isLoading} />
        </Row>
        <Row>
          <ToSend details={bankOrderDetails} isLoading={isLoading} />
          <Received details={bankOrderDetails} isLoading={isLoading} />
        </Row>
      </Container>
    </div>
  );
};
