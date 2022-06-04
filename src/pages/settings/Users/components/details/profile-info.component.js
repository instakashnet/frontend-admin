import moment from "moment";
import React from "react";
import { Card, CardBody, CardTitle, Col } from "reactstrap";
// CLASSES
import sharedClasses from "../modules/details/user-details.module.scss";

const ProfileInfo = ({ user, openModal }) => {
  return (
    <Col lg="6">
      <Card>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <CardTitle className={sharedClasses.CardTitle}>Información adicional</CardTitle>
            <button className={`d-flex items-center ${sharedClasses.editBtn}`} onClick={() => openModal("editUser")}>
              <i className="bx bxs-edit-alt"></i><span className="underline ml-1">Editar</span>
            </button>
          </div>
          <section className="grid grid-cols-2">
            <p>
              {user.job || "No tiene"}
              <span className={`d-block ${sharedClasses.textMuted}`}>Ocupación</span>
            </p>
            <p>
              {user.profession || "No tiene"}
              <span className={`d-block ${sharedClasses.textMuted}`}>Profesión</span>
            </p>
            <p>
              {user.address || "No tiene"}
              <span className={`d-block ${sharedClasses.textMuted}`}>Dirección</span>
            </p>
            <p>
              {user.dateBirth ? moment(user.dateBirth).utcOffset("-0500").format("DD-MM-YYYY") : "Sin fecha registrada"}
              <span className={`d-block ${sharedClasses.textMuted}`}>Fecha de nacimiento</span>
            </p>
          </section>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileInfo;
