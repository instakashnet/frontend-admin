import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { changeBankOrderStatus, getBankOrderDetails } from "../../../store/actions";

import Breadcrumbs from "../../../components/Common/Breadcrumb";

import { ActionButtons } from "../components/details/action-buttons.component";
import { Received } from "../components/details/bankOrders/received.component";
import { StatusInfo } from "../components/details/bankOrders/status.component";
import { ToSend } from "../components/details/bankOrders/to-send.component";

export const BankOrderDetailsScreen = ({ match, history }) => {
  const { id } = match.params;
  const { bankOrderDetails, isLoading, isProcessing } = useSelector((state) => state.bankOrdersReducer);

  const dispatch = useDispatch();

  const onChangeStatus = (status) => {
    dispatch(changeBankOrderStatus(id, status));
  };

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
              onChangeStatus={onChangeStatus}
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
