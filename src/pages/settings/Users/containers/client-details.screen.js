// HOOKS
import { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// HISTORY
import { useHistory } from "react-router-dom";
// REACTSTRAP
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
// CUSTOM HOOK
import { useClientData } from "../../../../hooks/useClientData";
// REDUX ACTIONS
import { disableClientInit, getClientAccounts, getClientAffiliates, getClientDetails, getClientExchanges } from "../../../../store/actions";
// COMPONENTS
import LoadingPage from "../../../LoadingPage";
import { UserTransactions } from "../../../orders/components/details/exchange/user-transactions.component";
import CompanyInfo from "../components/details/company-info.component";
import ProfileCompleted from "../components/details/profile-completed.component";
import ProfileInfo from "../components/details/profile-info.component";
import UserDocuments from "../components/details/user-documents.component";
import BasicInfo from "../components/details/user-info.component";
import UserKash from "../components/details/user-kash.component";
import AddDocument from "../components/forms/add-document.component";
import CompanyProfile from "../components/forms/edit-company.component";
import EditUserInfo from "../components/forms/edit-info.component";
import EditUserProfile from "../components/forms/edit-profile.component";
import UserAccounts from "../components/tables/user-accounts-table.component";
import UserAffiliates from "../components/tables/user-affiliates.component";


export const ClientDetailsScreen = (props) => {
  const history = useHistory(),
    dispatch = useDispatch(),
    [modal, setModal] = useState(false),
    [modalType, setModalType] = useState(null),
    [profileDetails, setProfileDetails] = useState({}),
    [documentType, setDocumentType] = useState(""),
    { id } = props.match.params,
    { details, accounts, affiliates, exchanges, isProcessing, isLoading } = useSelector((state) => state.Clients),
    { completed, color } = useClientData(details);

  const openModal = (modalType, profileData = {}, document = "") => {
    setProfileDetails(profileData);
    setModalType(modalType);
    setModal(true);
    setDocumentType(document);
  };

  useEffect(() => {
    dispatch(getClientDetails(id));
    dispatch(getClientAccounts(id));
    dispatch(getClientAffiliates(id));
  }, [dispatch, id]);

  const closeModal = () => {
    setProfileDetails({});
    setModal(false);
  };
  const disableClientHandler = (id, active) => dispatch(disableClientInit(id, active));
  const getTransactions = () => dispatch(getClientExchanges(id));

  let ModalComponent;

  if (modalType === "editUser") ModalComponent = <EditUserProfile userId={id} details={details} isProcessing={isProcessing} closeModal={closeModal} />;
  if (modalType === "companyProfile") ModalComponent = <CompanyProfile userId={id} isProcessing={isProcessing} closeModal={closeModal} details={profileDetails} />;

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
              {details && <BasicInfo user={details} onDisable={disableClientHandler} openModal={openModal} />}
              <Col lg="6" xl="4">
                {details?.completed && <ProfileInfo user={details} openModal={openModal} />}
                <UserDocuments user={details} openModal={openModal} />
              </Col>
              {details && <ProfileCompleted user={details} completed={completed} color={color} />}
            </Row>
            <Row>
              <CompanyInfo details={details} openModal={openModal} dispatch={dispatch} />
              <UserAccounts accounts={accounts} isLoading={isLoading} />
            </Row>
            <Row>
              <UserAffiliates affiliates={affiliates} isLoading={isLoading} />
              <UserKash />
            </Row>
            <Row>
              <Col lg="12">
                <UserTransactions orders={exchanges} isLoading={isLoading} getTransactions={getTransactions} />
              </Col>
            </Row>
          </Container>

          <Modal isOpen={modal} role="dialog" autoFocus={true} centered={true} tabIndex="-1" toggle={closeModal}>
            <ModalHeader toggle={closeModal}>{profileDetails.id ? "Editar perfil" : "Crear perfil"}</ModalHeader>
            <ModalBody>{ModalComponent}</ModalBody>
          </Modal>
        </>
      )}
    </div>
  );
};
