import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { disableClientInit, getClientDetails, getClientExchanges, getClientAccounts } from "../../../../store/actions";

import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import LoadingPage from "../../../LoadingPage";
import { UserTransactions } from "../../../orders/components/details/exchange/user-transactions.component";
import { UserAccounts } from "../components/tables/user-accounts-table.component";
import { AddDocument } from "../components/forms/add-document.component";
import EditUserProfile from "../components/forms/edit-profile.component";
import EditCompanyProfile from "../components/forms/edit-company.component";
import EditUserInfo from "../components/forms/edit-info.component";
import BasicInfo from "../components/details/user-info.component";
import ProfileInfo from "../components/details/profile-info.component";
import CompanyInfo from "../components/details/company-info.component";

export const ClientDetailsScreen = (props) => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [profileDetails, setProfileDetails] = useState({});
  const [documentType, setDocumentType] = useState("");
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const { details, accounts, exchanges, isProcessing, isLoading } = useSelector((state) => state.Clients);

  let companyProfiles = [];
  let userProfile;

  if (details && details.profiles) {
    userProfile = details.profiles.find((profile) => profile.type === "natural");
    companyProfiles = details.profiles.filter((profile) => profile.type !== "natural");
  }

  const openModal = (modalType, profileData = {}, document = "") => {
    setProfileDetails(profileData);
    setModalType(modalType);
    setModal(true);
    setDocumentType(document);
  };

  const closeModal = () => {
    setProfileDetails({});
    setModal(false);
  };

  useEffect(() => {
    dispatch(getClientDetails(id));
    dispatch(getClientExchanges(id));
    dispatch(getClientAccounts(id));
  }, [dispatch, id]);

  const disableClientHandler = (id, active) => dispatch(disableClientInit(id, active));

  let ModalComponent;

  if (modalType === "addNatural") ModalComponent = <EditUserProfile userId={id} details={profileDetails} isProcessing={isProcessing} closeModal={closeModal} />;
  if (modalType === "editProfile")
    ModalComponent =
      profileDetails.type === "natural" ? (
        <EditUserProfile userId={id} isProcessing={isProcessing} closeModal={closeModal} details={profileDetails} />
      ) : (
        <EditCompanyProfile userId={id} isProcessing={isProcessing} closeModal={closeModal} details={profileDetails} />
      );

  if (modalType === "editInfo") ModalComponent = <EditUserInfo userId={id} isProcessing={isProcessing} details={details} closeModal={closeModal} />;
  if (modalType === "addDocument") ModalComponent = <AddDocument userId={id} type={documentType} isProcessing={isProcessing} closeModal={closeModal} />;

  return (
    <div className="page-content">
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <>
          <Container fluid>
            <button type="button" onClick={() => history.goBack()} className="btn btn-blue waves-effect btn-label waves-light">
              <i className="fas fa-arrow-left label-icon"></i> Regresar
            </button>
            <Row>
              {details && <BasicInfo user={details} profile={userProfile} onDisable={disableClientHandler} openModal={openModal} />}
              {userProfile && <ProfileInfo profile={userProfile} openModal={openModal} />}
            </Row>
            <Row>
              {companyProfiles.length > 0 && (
                <Col lg="12">
                  <Breadcrumbs title="Perfiles de empresa" breadcrumbItem="Empresas" />
                </Col>
              )}
              {companyProfiles.map((company) => (
                <CompanyInfo key={company.id} company={company} openModal={openModal} />
              ))}
            </Row>
            {userProfile && (
              <Row>
                <Col lg="6">
                  <UserAccounts accounts={accounts} isLoading={isLoading} />
                </Col>
                <Col lg="12">
                  <UserTransactions orders={exchanges} isLoading={isLoading} />
                </Col>
              </Row>
            )}
          </Container>

          <Modal isOpen={modal} role="dialog" autoFocus={true} centered={true} tabIndex="-1" toggle={closeModal}>
            <ModalHeader toggle={closeModal}>Editar perfil</ModalHeader>
            <ModalBody>{ModalComponent}</ModalBody>
          </Modal>
        </>
      )}
    </div>
  );
};
