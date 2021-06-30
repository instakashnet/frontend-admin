import React from "react";
import { Row, Col } from "reactstrap";

import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import CompletedUsers from "../components/tables/completed-clients.component";
import NotCompletedUsers from "../components/tables/not-completed-clients.component";

export const ClientsScreen = () => {
  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Usuarios" breadcrumbItem="Usuarios registrados" />
        <Row>
          <Col className="col-12">
            <h3 className="ml-2 mb-3">Perfil completo</h3>
            <CompletedUsers />
          </Col>
          <Col className="col-12">
            <h3 className="ml-2 mb-3">Perfil incompleto</h3>
            <NotCompletedUsers />
          </Col>
        </Row>
      </div>
    </div>
  );
};
