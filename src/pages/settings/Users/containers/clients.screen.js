import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import CompletedUsers from "../components/tables/completed-clients.component";
import NotCompletedUsers from "../components/tables/not-completed-clients.component";

export const ClientsScreen = () => {
  const dispatch = useDispatch();

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Usuarios" breadcrumbItem="Usuarios registrados" />
        <Row>
          <Col>
            <CompletedUsers dispatch={dispatch} />
          </Col>
          <Col>
            <NotCompletedUsers dispatch={dispatch} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
