import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";

import Logo from "../assets/images/logo-light.svg";

const LoadingPage = () => {
  return (
    <Container>
      <Row>
        <Col className='col-12 d-flex flex-column justify-content-center align-items-center vh-100'>
          <img src={Logo} alt='Instakash' width={220} className='mb-5' />
          <Spinner />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingPage;
