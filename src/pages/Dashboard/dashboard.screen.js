import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";

//import Charts
import ExchangesChart from "./components/charts/exchanges-chart.component";
import UsersChart from "./components/charts/users-chart.component";

import Counters from "./components/counters.component";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

export const DashboardScreen = () => {
  const { currencyBarData } = useSelector((state) => state.Charts);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={"Dashboard"} breadcrumbItem={"Dashboard"} />
          <Row>
            <Col xl="12">
              <Row>
                <Counters />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xl="6">
              <ExchangesChart data={currencyBarData} title="Movimiento cambios de divisa" />
            </Col>
            <Col xl="6">
              <UsersChart />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
