import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";

//import Charts
import StackedColumnChart from "./StackedColumnChart";
import UsersChart from "./UsersChart";

// Pages Components
// import MonthlyEarning from "./MonthlyEarning";
import ActivityComp from "./ActivityComp";
import Counters from "./Counters";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withNamespaces } from "react-i18next";

const Dashboard = (props) => {
  const user = useSelector((state) => state.Login.user);
  const { currencyBarData } = useSelector((state) => state.Charts);

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={props.t("Dashboard")} breadcrumbItem={props.t("Dashboard")} />
          <Row>
            <Col xl='12'>
              <Row>
                <Counters />
              </Row>
            </Col>
            {user && user.role === "ROLE_ADMIN" ? (
              <Col xl='8'>
                <ActivityComp />
              </Col>
            ) : null}
          </Row>
          <Row>
            <Col xl='12'>
              <StackedColumnChart data={currencyBarData} title='Movimiento cambios de divisa' />
            </Col>
            {/* <Col xl='6'>
              <Card>
                <CardBody>
                  <CardTitle className='mb-4 float-sm-left'>Avances de efectivo (por mes)</CardTitle>

                  <StackedColumnChart data={advanceBarData} />
                </CardBody>
              </Card>
            </Col> */}
          </Row>

          <Row>
            <Col className='col-12'>
              <UsersChart />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withNamespaces()(Dashboard);
