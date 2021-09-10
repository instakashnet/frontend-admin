import React from "react";
import { Row, Col, Spinner } from "reactstrap";

import Logo from "../assets/images/logo-light.svg";

const LoadingPage = () => {
  return (
    <div className="loading-screen">
      <Row>
        <Col className="flex flex-col vh-100 justify-center items-center">
          <img src={Logo} alt="Instakash" width={220} className="mb-4" />
          <Spinner />
        </Col>
      </Row>
    </div>
  );
};

export default LoadingPage;
