import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCounters } from "../../store/actions";
import { Media, Col, Card, CardBody } from "reactstrap";

const Counters = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCounters());
  }, [dispatch]);

  const { counters } = useSelector((state) => state.Counters);

  const reports = [
    { title: "Cambios de divisas (hoy)", iconClass: "bx-dollar-circle", description: counters && counters.ordersCount },
    { title: "Avances de efectivo (hoy)", iconClass: "bx-credit-card", description: 0 },
    { title: "Clientes registrados (hoy)", iconClass: "bx-user-check", description: counters && counters.usersCount },
  ];

  return reports.map((report, key) => (
    <Col md='4' key={"_col_" + key}>
      <Card className='mini-stats-wid'>
        <CardBody>
          <Media>
            <Media body>
              <p className='text-muted font-weight-medium'>{report.title}</p>
              <h4 className='mb-0'>{report.description}</h4>
            </Media>
            <div className='mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center'>
              <span className='avatar-title'>
                <i className={"bx " + report.iconClass + " font-size-24"}></i>
              </span>
            </div>
          </Media>
        </CardBody>
      </Card>
    </Col>
  ));
};

export default React.memo(Counters);
