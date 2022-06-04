import React from "react";
import { Card, CardBody, Col } from "reactstrap";
// ASSETS
import Female from "../../../../../assets/images/female-dark.svg";
import Male from "../../../../../assets/images/male-dark.svg";
// CLASSES
import sharedClasses from "../modules/details/user-details.module.scss";

const BasicInfo = ({ user, openModal, onDisable }) => {
  const clientName = user.firstName || user.lastName ? `${user.firstName.split(" ")[0]} ${user.lastName.split(" ")[0]}` : "Sin nombre";

  let Avatar = Male;
  if (user.identitySex === "female") Avatar = Female;

  return (
    <Col lg="6">
      <Card>
        <CardBody>
          <div className="d-flex justify-end items-center">
            {!user.documentType && (
              <button type="button" className="underline text-primary mr-3" onClick={() => openModal("editUser")}>
                Agregar datos
              </button>
            )}
            <button type="button" className={`d-flex items-center ${sharedClasses.editBtn}`} onClick={() => openModal("editInfo")}>
              <i className="bx bxs-edit-alt"></i><span className="underline ml-1">Editar</span>
            </button>
            <button type="button" className={`${!!+user.active ? "text-danger" : "text-info"} underline ml-3`} onClick={() => onDisable(user.id, !!+user.active)}>
              {!!+user.active ? "Deshabilitar" : "Habilitar"}
            </button>
          </div>
          <section className="grid grid-cols-2">
            <div className="avatar-lg">{Avatar && <img src={Avatar} alt="profile" className="rounded-circle ml-3" width={85} height={85} />}</div>
            <p className="self-center mb-0">
              #{user.username}
              <span className={`d-block ${sharedClasses.textMuted}`}>Código</span>
            </p>
            <p>
              {clientName}
              <span className={`d-block ${sharedClasses.textMuted}`}>Nombre y apellido</span>
            </p>
            <p>
              {user.phone || "Sin teléfono"}
              <span className={`d-block ${sharedClasses.textMuted}`}>Teléfono</span>
            </p>
            <p>
              {user.documentType} {user.documentIdentification || "No tiene"}
              <span className={`d-block ${sharedClasses.textMuted}`}>Documento</span>
            </p>
            <p>
              {user.email || "Sin correo"}
              <span className={`d-block ${sharedClasses.textMuted}`}>Correo electrónico</span>
            </p>
          </section>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicInfo;
