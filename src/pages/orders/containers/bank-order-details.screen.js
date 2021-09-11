import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Badge } from "reactstrap";
import { getBankOrderDetails, changeBankOrderStatus } from "../../../store/actions";

import Breadcrumbs from "../../../components/Common/Breadcrumb";

import UserInfo from "../components/details/user-details.component";
import Received from "../components/details/exchange/received.component";
import { ToSend } from "../components/details/bankOrders/to-send.component";
import { ActionButtons } from "../components/details/action-buttons.component";

export const BankOrderDetailsScreen = ({ match, history }) => {
  const { id } = match.params;
  const { bankOrderDetails, isLoading, isProcessing } = useSelector((state) => state.bankOrdersReducer);

  const dispatch = useDispatch();

  const onDeclineOrder = () => dispatch(changeBankOrderStatus(id, 5));
  const onApproveOrder = () => dispatch(changeBankOrderStatus(id, 6));

  useEffect(() => {
    dispatch(getBankOrderDetails(id));
  }, [dispatch, id]);

  console.log(bankOrderDetails);

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
              hasInvoice
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg="8" className="d-flex flex-wrap justify-content-between items-center">
            <Badge className="py-2 font-size-15 w-full max-w-xs" style={{ color: "#fff", backgroundColor: bankOrderDetails.stateColor }}>
              {bankOrderDetails.stateName}
            </Badge>
          </Col>
        </Row>
        <Row>
          {/* <Received details={details} isLoading={isLoading} isProcessing={isProcessing} /> */}
          {bankOrderDetails.amountSent && <ToSend details={bankOrderDetails} isLoading={isLoading} />}
        </Row>
      </Container>
    </div>
  );
};
