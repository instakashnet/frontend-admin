import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// CUSTOM HOOKS
import { useRole } from "../../hooks/useRole";
// COMPONENTS
import ExchangesChart from "./components/charts/exchanges-chart.component";
import UsersChart from "./components/charts/users-chart.component";
import Counters from "./components/counters.component";
import { DailyEarning } from "./components/daily-earning.component";


export const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { currencyBarData } = useSelector((state) => state.Charts);
  const { user } = useSelector((state) => state.Login);

  const [role] = useRole(user);
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title={"Dashboard"} breadcrumbItem={"Dashboard"} />
        <Row>
          <Col xl="12">
            <Counters dispatch={dispatch} />
          </Col>
        </Row>
        {role === "admin" && (
          <Row>
            <Col lg="6" xl="4">
              <DailyEarning dispatch={dispatch} />
            </Col>
          </Row>
        )}
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
