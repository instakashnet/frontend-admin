import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { disableClientInit, getClientDetails } from '../../../../store/actions';

import ExchangesTable from './ExchangesTable';
import AccountsTable from './AccountsTable';
import Breadcrumbs from '../../../../components/Common/Breadcrumb';
import EditUserProfile from './EditUserProfile';
import EditCompanyProfile from './EditCompanyProfile';
import Alert from '../../../../components/UI/Alert';
import BasicInfo from '../../../../components/clients/BasicInfo';
import ProfileInfo from '../../../../components/clients/ProfileInfo';
import CompanyInfo from '../../../../components/clients/CompanyInfo';
import LoadingPage from '../../../LoadingPage';
import EditUserInfo from './EditUserInfo';

const ClientDetails = (props) => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [profileDetails, setProfileDetails] = useState({});
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const { details, isProcessing, isLoading, error } = useSelector((state) => state.Clients);

  let companyProfiles = [];
  let userProfile;

  if (details && details.profiles) {
    userProfile = details.profiles.find((profile) => profile.type === 'natural');
    companyProfiles = details.profiles.filter((profile) => profile.type !== 'natural');
  }

  const openModal = (modalType, profileData = {}) => {
    setProfileDetails(profileData);
    setModalType(modalType);
    setModal(true);
  };

  const closeModal = () => {
    setProfileDetails({});
    setModal(false);
  };

  useEffect(() => {
    dispatch(getClientDetails(id));
  }, [dispatch, id]);

  const disableClientHandler = (id, active) => dispatch(disableClientInit(id, active));

  let ModalComponent;

  if (modalType === 'addNatural') ModalComponent = <EditUserProfile userId={id} details={profileDetails} isProcessing={isProcessing} closeModal={closeModal} />;
  if (modalType === 'editProfile')
    ModalComponent =
      profileDetails.type === 'natural' ? (
        <EditUserProfile userId={id} isProcessing={isProcessing} closeModal={closeModal} details={profileDetails} />
      ) : (
        <EditCompanyProfile userId={id} isProcessing={isProcessing} closeModal={closeModal} details={profileDetails} />
      );

  if (modalType === 'editInfo') ModalComponent = <EditUserInfo userId={id} isProcessing={isProcessing} details={details} closeModal={closeModal} />;

  return (
    <div className='page-content'>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <>
          <Container fluid>
            {error && <Alert color='danger' error={error} />}
            <button type='button' onClick={() => history.goBack()} className='btn btn-blue waves-effect btn-label waves-light'>
              <i className='fas fa-arrow-left label-icon'></i> Regresar
            </button>
            <Row>
              {details && <BasicInfo user={details} profile={userProfile} onDisable={disableClientHandler} openModal={openModal} />}
              {userProfile && <ProfileInfo profile={userProfile} openModal={openModal} />}
            </Row>
            <Row>
              {companyProfiles.length > 0 && (
                <Col lg='12'>
                  <Breadcrumbs title='Perfiles de empresa' breadcrumbItem='Empresas' />
                </Col>
              )}
              {companyProfiles.map((company) => (
                <CompanyInfo key={company.id} company={company} openModal={openModal} />
              ))}
            </Row>
            {userProfile && (
              <Row>
                <Col lg='12'>
                  <ExchangesTable id={id} />
                </Col>
                <Col lg='6'>
                  <AccountsTable userId={id} />
                </Col>
              </Row>
            )}
          </Container>

          <Modal isOpen={modal} role='dialog' autoFocus={true} centered={true} tabIndex='-1' toggle={closeModal}>
            <ModalHeader toggle={closeModal}>Editar perfil</ModalHeader>
            <ModalBody>{ModalComponent}</ModalBody>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ClientDetails;