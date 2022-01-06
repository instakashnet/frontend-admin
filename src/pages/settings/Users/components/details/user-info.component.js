import React from "react";
import { Col, Card, CardBody, Button } from "reactstrap";

import Male from "../../../../../assets/images/profile-male.svg";
import Female from "../../../../../assets/images/profile-female.svg";

const BasicInfo = ({ user, openModal, onDisable }) => {
  let Avatar = Male;
  if (user.identity_sex === "female") Avatar = Female;

  return (
    <Col lg="6">
      <Card className="text-center">
        <CardBody>
          <div className="avatar-sm mx-auto mb-4">{Avatar && <img src={Avatar} alt="profile" className="img-thumbnail rounded-circle" width={85} height={85} />}</div>
          <p className="text-muted mb-2">{user.email}</p>
          <span className="badge badge-primary font-size-14 m-1 mb-2">{user.phone || "Sin teléfono"}</span>
          <p className="text-muted">
            KASH acumulados = <b>{user.kashAcumulated || 0}</b>
          </p>
          <div className="flex items-center justify-center">
            {!user.document_type && (
              <Button type="button" className="btn-primary mr-3" onClick={() => openModal("editUser")}>
                Agregar datos
              </Button>
            )}
            <Button type="button" className="btn-secondary" onClick={() => openModal("editInfo")}>
              Editar datos
            </Button>
            <Button type="button" className="btn-danger ml-3" onClick={() => onDisable(user.id, !!+user.active)}>
              {!!+user.active ? "Deshabilitar" : "Habilitar"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicInfo;
