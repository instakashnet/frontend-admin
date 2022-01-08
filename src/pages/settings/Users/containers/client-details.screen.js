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
  const history = useHistory(),
    dispatch = useDispatch(),
    [modal, setModal] = useState(false),
    [modalType, setModalType] = useState(null),
    [profileDetails, setProfileDetails] = useState({}),
    [documentType, setDocumentType] = useState(""),
    { id } = props.match.params,
    { details, accounts, exchanges, isProcessing, isLoading } = useSelector((state) => state.Clients);

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

  if (modalType === "editUser") ModalComponent = <EditUserProfile userId={id} details={details} isProcessing={isProcessing} closeModal={closeModal} />;
  if (modalType === "editProfile") ModalComponent = <EditCompanyProfile userId={id} isProcessing={isProcessing} closeModal={closeModal} details={profileDetails} />;

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
              {details && (
                <>
                  <BasicInfo user={details} onDisable={disableClientHandler} openModal={openModal} />
                  <ProfileInfo user={details} openModal={openModal} />
                </>
              )}
            </Row>
            <Row>
              {details && details.profiles.length > 0 && (
                <Col lg="12">
                  <Breadcrumbs title="Perfiles de empresa" breadcrumbItem="Empresas" />
                </Col>
              )}
              {details && details.profiles.map((company) => <CompanyInfo key={company.id} company={company} openModal={openModal} />)}
            </Row>
            <Row>
              {accounts.length > 0 && (
                <Col lg="6">
                  <UserAccounts accounts={accounts} isLoading={isLoading} />
                </Col>
              )}
              {exchanges.length > 0 && (
                <Col lg="12">
                  <UserTransactions orders={exchanges} isLoading={isLoading} />
                </Col>
              )}
            </Row>
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
