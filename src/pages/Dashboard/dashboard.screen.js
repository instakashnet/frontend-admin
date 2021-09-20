import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";

// COMPONENTS
import ExchangesChart from "./components/charts/exchanges-chart.component";
import UsersChart from "./components/charts/users-chart.component";
import { DailyEarning } from "./components/daily-earning.component";
import Counters from "./components/counters.component";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

export const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { currencyBarData } = useSelector((state) => state.Charts);

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title={"Dashboard"} breadcrumbItem={"Dashboard"} />
        <Row>
          <Col xl="12">
            <Counters dispatch={dispatch} />
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <DailyEarning dispatch={dispatch} />
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
  );
};
