import React from "react";
import { Col, Row, Container } from "reactstrap";
import { useSelector } from "react-redux";

import CountriesTable from "./CountriesTable";

const Countries = () => {
  const countries = useSelector((state) => state.Data.countries);
  console.log(countries);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='8'>
            <CountriesTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Countries;
