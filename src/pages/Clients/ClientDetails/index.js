import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Table, CardTitle, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getClientDetails } from "../../../store/actions";
import moment from "moment-timezone";

import ExchangesTable from "./ExchangesTable";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

import Male from "../../../assets/images/profile-male.svg";
import Female from "../../../assets/images/profile-female.svg";

const ClientDetails = (props) => {
  const [modal, setModal] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const details = useSelector((state) => state.Clients.details);

  let companyProfiles = [];
  let userProfile;
  let Avatar;

  if (details) {
    companyProfiles = details.profiles.filter((profile) => profile.type !== "natural");
    userProfile = details.profiles.find((profile) => profile.type === "natural");
    Avatar = userProfile.identity_sex === "male" ? Male : Female;
  }

  const openModal = (profileData) => {
    setProfileDetails(profileData);
    setModal(true);
  };

  const closeModal = () => {
    setProfileDetails(null);
    setModal(false);
  };

  console.log(profileDetails);

  useEffect(() => {
    dispatch(getClientDetails(id));
  }, [dispatch, id]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='6'>
            <Card className='text-center'>
              <CardBody>
                <div className='avatar-sm mx-auto mb-4'>{Avatar && <img src={Avatar} alt='profile' className='img-thumbnail rounded-circle' width={85} height={85} />}</div>
                <h5 className='font-size-15'>{userProfile && `${userProfile.first_name} ${userProfile.last_name}`}</h5>
                <p className='text-muted'>{details && details.email}</p>
                <span className='badge badge-primary font-size-14 m-1'>{details && details.phone}</span>
              </CardBody>
            </Card>
          </Col>
          <Col lg='6'>
            <Card>
              <CardBody>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                  <CardTitle>Información de perfil</CardTitle>
                  <Button onClick={() => openModal(userProfile)}>
                    <span className='bx bx-edit mr-2' /> Editar
                  </Button>
                </div>

                <div className='table-responsive'>
                  <Table className='table-nowrap mb-0'>
                    <tbody>
                      {userProfile && userProfile.date_birth && (
                        <tr>
                          <th scope='row'>Fecha de nacimiento</th>
                          <td>{moment(userProfile.date_birth).format("Do MMMM YYYY")}</td>
                        </tr>
                      )}
                      {userProfile && userProfile.address && (
                        <tr>
                          <th scope='row'>Dirección</th>
                          <td>{userProfile.address}</td>
                        </tr>
                      )}
                      {userProfile && userProfile.job && (
                        <tr>
                          <th scope='row'>Ocupación</th>
                          <td>{userProfile.job}</td>
                        </tr>
                      )}
                      {userProfile && userProfile.profession && (
                        <tr>
                          <th scope='row'>Profesión</th>
                          <td>{userProfile.profession}</td>
                        </tr>
                      )}
                      <tr>
                        <th scope='row'>¿Persona políticamente expuesta?</th>
                        <td>{userProfile && userProfile.pep ? "SI" : "NO"}</td>
                      </tr>
                      <tr>
                        <th scope='row'>Documento</th>
                        <td>{userProfile && `${userProfile.document_type} ${userProfile.document_identification}`}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {companyProfiles.length > 0 && (
            <Col lg='12'>
              <Breadcrumbs title='Perfiles de empresa' breadcrumbItem='Empresas' />
            </Col>
          )}
          {companyProfiles.map((company) => (
            <Col lg='6' key={company.id}>
              <Card>
                <CardBody>
                  <div className='d-flex align-items-center justify-content-between mb-4'>
                    <CardTitle>Información de empresa</CardTitle>
                    <Button onClick={() => openModal(company)}>
                      <span className='bx bx-edit mr-2' /> Editar
                    </Button>
                  </div>

                  <div className='table-responsive'>
                    <tr>
                      <th scope='row'>Empresa</th>
                      <td>{company.razon_social}</td>
                    </tr>
                    <tr>
                      <th scope='row'>RUC</th>
                      <td>{company.ruc}</td>
                    </tr>
                    <tr>
                      <th scope='row'>Dirección fiscal</th>
                      <td>{company.address}</td>
                    </tr>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col lg='12'>
            <Breadcrumbs title='Cambios de divisas' breadcrumbItem='Cambios realizados anteriormente' />
            <ExchangesTable id={id} />
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} role='dialog' autoFocus={true} centered={true} tabIndex='-1' toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Editar perfil</ModalHeader>
        <ModalBody>{/* <TransferInvoice isProcessing={isProcessing} orderId={id} onApprove={onApproveExchange} /> */}</ModalBody>
      </Modal>
    </div>
  );
};

export default ClientDetails;
