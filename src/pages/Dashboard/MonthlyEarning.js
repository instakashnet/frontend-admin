import React from "react";
import { useSelector } from "react-redux";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

import ApexRadial from "./ApexRadial";

const MonthlyEarning = () => {
  const { counters } = useSelector((state) => state.Counters);

  let percentageDifference;
  if (counters) {
    const { solesHoy, solesAyer } = counters;
    percentageDifference = parseInt(((solesHoy - solesAyer) / solesAyer) * 100);
  }

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className='mb-4'>Soles cambiados</CardTitle>
          <Row>
            <Col sm='6'>
              <p className='text-muted'>Hoy</p>
              <h3>s/. {counters && counters.solesHoy.toFixed(2)}</h3>
              <p className='text-muted'>
                <span className='text-success mr-2'>
                  {percentageDifference}% <i className='mdi mdi-arrow-up'></i>
                </span>
                En comparación al dia anterior
              </p>
            </Col>
            <Col sm='6'>
              <div className='mt-4 mt-sm-0'>
                <ApexRadial />
              </div>
            </Col>
          </Row>
          {/* <p className='text-muted mt-4 mb-3'>We craft digital, graphic and dimensional thinking.</p> */}
        </CardBody>
      </Card>
    </>
  );
};

export default MonthlyEarning;
