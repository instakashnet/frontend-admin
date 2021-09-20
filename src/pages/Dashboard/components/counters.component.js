import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCounters, getTotalKashInit } from "../../../store/actions";
import { Row, Media, Col, Card, CardBody, Spinner } from "reactstrap";

const Counters = ({ dispatch }) => {
  const { counters, totalKash, isLoading } = useSelector((state) => state.Counters);

  useEffect(() => {
    dispatch(getCounters());
    dispatch(getTotalKashInit());
  }, [dispatch]);

  const reports = [
    { title: "Cambios de divisas (hoy)", iconClass: "bx-transfer-alt", description: counters.ordersCount },
    { title: "Clientes registrados (hoy)", iconClass: "bx-user-check", description: counters.usersCount },
    { title: "Kash totales", iconClass: "bx-dollar-circle", description: totalKash },
  ];

  return (
    <Row>
      {reports.map((report, key) => (
        <Col md="4" key={"_col_" + key}>
          <Card className="mini-stats-wid">
            <CardBody>
              {isLoading ? (
                <Spinner size="md" />
              ) : (
                <Media>
                  <Media body>
                    <p className="text-muted font-weight-medium">{report.title}</p>
                    <h4 className="mb-0">{report.description}</h4>
                  </Media>
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                    <span className="avatar-title">
                      <i className={"bx " + report.iconClass + " font-size-24"}></i>
                    </span>
                  </div>
                </Media>
              )}
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default React.memo(Counters);
