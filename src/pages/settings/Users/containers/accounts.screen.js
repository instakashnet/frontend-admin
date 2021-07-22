import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";

import { AccountsTable } from "../components/tables/accounts-table.component";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

export const ClientsAccountsScreen = () => {
  const dispatch = useDispatch();

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Cuentas de usuarios" breadcrumbItem="Cuentas de usuarios" />
        <Row>
          <Col>
            <AccountsTable dispatch={dispatch} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
