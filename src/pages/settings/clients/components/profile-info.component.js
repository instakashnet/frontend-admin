import React from "react";
import moment from "moment";
import { Col, Card, CardBody, CardTitle, Button, Table } from "reactstrap";

const ProfileInfo = ({ profile, openModal }) => {
  console.log(profile);

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
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileInfo;
