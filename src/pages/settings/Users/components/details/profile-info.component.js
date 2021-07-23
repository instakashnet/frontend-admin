import React from "react";
import { Photo } from "@material-ui/icons";
import moment from "moment";
import { Col, Card, CardBody, CardTitle, Button, Table } from "reactstrap";

const ProfileInfo = ({ profile, openModal }) => {
  return (
    <Col lg="6">
      <Card>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <CardTitle>Información de perfil</CardTitle>
            <Button onClick={() => openModal("editProfile", profile)}>
              <span className="bx bx-edit mr-2" /> Editar
            </Button>
          </div>

          <div className="table-responsive">
            <Table className="mb-0">
              <tbody>
                <tr>
                  <th scope="row">Nombre completo:</th>
                  <td>{`${profile.first_name} ${profile.last_name}`}</td>
                </tr>
                {profile.date_birth && (
                  <tr>
                    <th scope="row">Fecha de nacimiento</th>
                    <td>{moment(profile.date_birth).format("Do MMMM YYYY")}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">Dirección</th>
                  <td>{profile.address || ""}</td>
                </tr>
                <tr>
                  <th scope="row">Ocupación</th>
                  <td>{profile.job || ""}</td>
                </tr>
                <tr>
                  <th scope="row">Profesión</th>
                  <td>{profile.profession || ""}</td>
                </tr>
                <tr>
                  <th scope="row">¿Persona políticamente expuesta?</th>
                  <td>{profile.pep ? "SI" : "NO"}</td>
                </tr>
                <tr>
                  <th scope="row">Documento</th>
                  <td>{`${profile.document_type} ${profile.document_identification}`}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <CardTitle className="text-center">Fotos de documento</CardTitle>
          <div className="flex flex-wrap items-center justify-center mt-4">
            {profile.identity_photo ? (
              <div className="flex flex-col items-center mx-6">
                <a className="flex flex-col items-center justify-center" href={profile.identity_photo} target="_blank" rel="noopener noreferrer">
                  <Photo size={35} />
                  <p className="text-muted mb-1">Foto frontal</p>
                </a>
                <button className="underline" onClick={() => openModal("addDocument", profile, "identity_photo")}>
                  Cambiar foto
                </button>
              </div>
            ) : (
              <button className="underline mx-6" onClick={() => openModal("addDocument", profile, "identity_photo")}>
                Agregar foto frontal
              </button>
            )}

            {profile.identity_photo_two ? (
              <div className="flex flex-col items-center mx-6">
                <a className="flex flex-col items-center justify-center" href={profile.identity_photo_two} target="_blank" rel="noopener noreferrer">
                  <Photo size={35} />
                  <p className="text-muted mb-1">Foto trasera</p>
                </a>
                <button className="underline" onClick={() => openModal("addDocument", profile, "identity_photo_two")}>
                  Cambiar foto
                </button>
              </div>
            ) : (
              <button className="underline mx-6" onClick={() => openModal("addDocument", profile, "identity_photo_two")}>
                Agregar foto trasera
              </button>
            )}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileInfo;
