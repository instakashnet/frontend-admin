import React from "react";
import { Photo } from "@material-ui/icons";
import moment from "moment";
import { Col, Card, CardBody, CardTitle, Button, Table } from "reactstrap";

const ProfileInfo = ({ user, openModal }) => {
  return (
    <Col lg="6">
      <Card>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <CardTitle>Información de perfil</CardTitle>
            <Button onClick={() => openModal("editUser")}>
              <span className="bx bx-edit mr-2" /> Editar
            </Button>
          </div>

          <div className="table-responsive">
            <Table className="mb-0">
              <tbody>
                <tr>
                  <th scope="row">Nombre completo:</th>
                  <td>{`${user.first_name} ${user.last_name}`}</td>
                </tr>
                {user.date_birth && (
                  <tr>
                    <th scope="row">Fecha de nacimiento</th>
                    <td>{moment(user.date_birth).format("Do MMMM YYYY")}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">Dirección</th>
                  <td>{user.address || ""}</td>
                </tr>
                <tr>
                  <th scope="row">Ocupación</th>
                  <td>{user.job || ""}</td>
                </tr>
                <tr>
                  <th scope="row">Profesión</th>
                  <td>{user.profession || ""}</td>
                </tr>
                <tr>
                  <th scope="row">¿Persona políticamente expuesta?</th>
                  <td>{user.pep ? "SI" : "NO"}</td>
                </tr>
                <tr>
                  <th scope="row">Documento</th>
                  <td>{`${user.document_type} ${user.document_identification}`}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <CardTitle className="text-center">Fotos de documento</CardTitle>

          {user.identityDocumentValidation !== "success" ? (
            <div className="flex flex-wrap items-center justify-center mt-4">
              {user.document_type !== "pasaporte" ? (
                <>
                  <button className="underline mx-6" onClick={() => openModal("addDocument", user, "identity_photo")}>
                    Agregar foto frontal
                  </button>
                  <button className="underline mx-6" onClick={() => openModal("addDocument", user, "identity_photo_two")}>
                    Agregar foto trasera
                  </button>
                </>
              ) : (
                <button className="underline mx-6" onClick={() => openModal("addDocument", user, "identity_photo")}>
                  Agregar foto pasaporte
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center mt-4">
              {user.document_type !== "pasaporte" ? (
                <>
                  <div className="flex flex-col items-center mx-6">
                    <a className="flex flex-col items-center justify-center" href={user.identity_photo_front} target="_blank" rel="noopener noreferrer">
                      <Photo size={35} />
                      <p className="text-muted mb-1">Foto frontal</p>
                    </a>
                    <button className="underline" onClick={() => openModal("addDocument", user, "identity_photo")}>
                      Cambiar foto
                    </button>
                  </div>
                  <div className="flex flex-col items-center mx-6">
                    <a className="flex flex-col items-center justify-center" href={user.identity_photo_back} target="_blank" rel="noopener noreferrer">
                      <Photo size={35} />
                      <p className="text-muted mb-1">Foto trasera</p>
                    </a>
                    <button className="underline" onClick={() => openModal("addDocument", user, "identity_photo_two")}>
                      Cambiar foto
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center mx-6">
                  <a className="flex flex-col items-center justify-center" href={user.identity_photo_front} target="_blank" rel="noopener noreferrer">
                    <Photo size={35} />
                    <p className="text-muted mb-1">Foto pasaporte</p>
                  </a>
                  <button className="underline" onClick={() => openModal("addDocument", user, "identity_photo")}>
                    Cambiar foto
                  </button>
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileInfo;
