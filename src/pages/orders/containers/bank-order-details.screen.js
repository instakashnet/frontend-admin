import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Badge } from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";

import UserInfo from "../components/details/user-details.component";
import Received from "../components/details/exchange/received.component";
import ToSend from "../components/details/exchange/to-send.component";
import LoadingPage from "../../LoadingPage";
import { ActionButtons } from "../components/details/action-buttons.component";

export const BankOrderDetailsScreen = ({ match, history }) => {
  const { id } = match.params;
  const { details, isLoading, isProcessing } = useSelector((state) => state.CurrencyExchange);

  const dispatch = useDispatch();

  const onDeclineExchange = () => {};
  const onApproveExchange = (values) => {};

  // useEffect(() => {
  //   dispatch(getExchangeDetails(id));
  // }, [dispatch, id]);

  return (
    <div className="page-content">
      <Container fluid>
        {isLoading && <LoadingPage />}
        {details && (
          <>
            <Breadcrumbs title="Detalles del cambio" breadcrumbItem="Detalles del cambio de divisa" />
            <Row>
              <Col lg="8">
                <ActionButtons
                  goBack={() => history.goBack()}
                  statusId={details.stateId}
                  billCreated={details.billAssigned}
                  onDecline={onDeclineExchange}
                  isProcessing={isProcessing}
                  hasInvoice
                />
                <UserInfo user={details.user} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col lg="8" className="d-flex flex-wrap justify-content-between items-center">
                <Badge className="py-2 font-size-15 w-full max-w-xs" style={{ color: "#fff", backgroundColor: details.stateColor }}>
                  {details.stateNme}
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col lg="5" xl="4">
                <Received details={details} isProcessing={isProcessing} />
              </Col>
              <Col lg="5" xl="4">
                <ToSend details={details} isLoading={isLoading} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};
