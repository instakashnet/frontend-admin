import React from "react";
import { Spinner } from "reactstrap";

import Logo from "../assets/images/logo-light.svg";

const LoadingPage = () => {
  return (
    <div className="loading-section">
      <img src={Logo} alt="Instakash" width={220} className="mb-4 md:mr-12" />
      <Spinner className="md:mr-12" />
    </div>
  );
};

export default LoadingPage;
