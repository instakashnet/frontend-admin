import React, { useEffect } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { connect } from "react-redux";
import { getClientDetails, getClientActivity, updateClient } from "../../../store/actions";

import CardContact from "../../../components/UI/CardContact";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ExchangesTable from "./ExchangesTable";
import AdvancesTable from "./AdvancesTable";
import EditClient from "./EditClient";

const ClientDetails = (props) => {
  const { getClientDetails, getClientActivity, isLoading, updateClient, details, activity, documentTypes } = props;
  const { id } = props.match.params;

  useEffect(() => {
    getClientDetails(id);
  }, [getClientDetails, id]);

  useEffect(() => {
    getClientActivity(id);
  }, [getClientActivity, id]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='4'>
            <Breadcrumbs title='Cliente' breadcrumbItem='Detalles' />
            <CardContact user={details} />
          </Col>
          <Col lg='8'>
            <ExchangesTable data={activity.cambiosDeDivisas} isLoading={isLoading} user={details} />
          </Col>
          <Col lg='4'>
            <EditClient update={updateClient} userId={id} user={details} documentTypes={documentTypes} />
            {props.error && <Alert color='danger'>{props.error}</Alert>}
            {props.success && <Alert color='success'>{props.success}</Alert>}
          </Col>
          <Col lg='8'>
            <AdvancesTable data={activity.avancesDeEfectivo} isLoading={isLoading} user={details} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { details, activity, isLoading, success, error } = state.Clients;
  const { documentTypes } = state.DocumentTypes;
  return { details, activity, success, error, isLoading, documentTypes };
};

export default connect(mapStateToProps, { getClientDetails, getClientActivity, updateClient })(ClientDetails);
