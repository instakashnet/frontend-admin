import { Card, CardBody, CardTitle, Col } from "reactstrap";
// ASSETS
import BuildingIcon from "../../../../../assets/images/profile-company.svg";
// REDUX ACTIONS
import { deleteProfileInit } from "../../../../../store/actions";
// COMPONENTS
import CompanyActions from "./company-actions.component";

const CompanyInfo = ({ details, openModal, dispatch }) => {
  const qtyCompanies = {
    0: "ninguna empresa registrada",
    1: "una empresa registrada",
    2: "dos empresas registradas",
    3: "tres empresas registradas",
  };

  // HANDLERS
  const deleteProfile = (profileId) => dispatch(deleteProfileInit(details.id, profileId));

  return (
    <Col lg="6">
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Cuentas de empresa</CardTitle>
          <figure className="text-center m-0">
            <img src={BuildingIcon} alt="Ícono de edificio" className="mx-auto" />
            <figcaption className="mt-3 mb-2" style={{ color: "#e4e4e4" }}>Empresas: {details?.profiles.length}/3</figcaption>
          </figure>
          <p className="text-center">El usuario actualmente {details?.profiles.length === 0 && "no"} posee<br />
            {qtyCompanies[details?.profiles.length]}.</p>
          <div className="d-flex justify-around flex-wrap items-start mt-5">
            <CompanyActions company={details?.profiles[0]} openModal={openModal} deleteProfile={deleteProfile} />
            <CompanyActions company={details?.profiles[1]} openModal={openModal} deleteProfile={deleteProfile} />
            <CompanyActions company={details?.profiles[2]} openModal={openModal} deleteProfile={deleteProfile} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CompanyInfo;
