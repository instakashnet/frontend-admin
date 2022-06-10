import React from "react";
import { Card, CardBody, CardTitle, Col } from "reactstrap";
// ASSETS
import BuildingIcon from "../../../../../assets/images/profile-company.svg";
// REDUX ACTIONS
import { deleteProfileInit } from "../../../../../store/actions";
// COMPONENTS
import CompanyActions from "./company-actions.component";

const CompanyInfo = ({ details, openModal, dispatch }) => {
  // VARIABLES
  const { id: userId, profiles } = details;

  const qtyCompanies = {
    1: "una empresa registrada",
    2: "dos empresas registradas",
    3: "tres empresas registradas",
  };

  // HANDLERS
  const deleteProfile = (profileId) => dispatch(deleteProfileInit(userId, profileId));

  return (
    <Col lg="6">
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Cuentas de empresa</CardTitle>
          <figure className="text-center m-0">
            <img src={BuildingIcon} alt="Ícono de edificio" className="mx-auto" />
            <figcaption className="mt-3 mb-2" style={{ color: "#e4e4e4" }}>Empresas: {profiles.length}/3</figcaption>
          </figure>
          <p className="text-center">El usuario actualmente posee<br />
            {qtyCompanies[profiles.length]}.</p>
          <div className="d-flex justify-around flex-wrap items-start mt-5">
            <CompanyActions company={profiles[0]} openModal={openModal} deleteProfile={deleteProfile} />
            <CompanyActions company={profiles[1]} openModal={openModal} deleteProfile={deleteProfile} />
            <CompanyActions company={profiles[2]} openModal={openModal} deleteProfile={deleteProfile} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CompanyInfo;
