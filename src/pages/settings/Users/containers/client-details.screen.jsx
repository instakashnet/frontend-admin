import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
// CUSTOM HOOK
import { useClientData } from '../../../../hooks/useClientData';
// REDUX ACTIONS
import { disableClientInit, getClientAccounts, getClientAffiliates, getClientDetails, getClientExchanges, getClientWithdrawals } from '../../../../store/actions';
// MOMENT.JS
import moment from 'moment';
// COMPONENTS
import LoadingPage from '../../../LoadingPage';
import { UserTransactions } from '../../../orders/components/details/exchange/user-transactions.component';
import { UserWithdrawals } from '../../../orders/components/details/withdrawal/user-withdrawals.component';
import AddBankAccount from '../components/add-bank-account.component';
import CompanyInfo from '../components/details/company-info.component';
import ProfileCompleted from '../components/details/profile-completed.component';
import ProfileInfo from '../components/details/profile-info.component';
import UserDocuments from '../components/details/user-documents.component';
import BasicInfo from '../components/details/user-info.component';
import UserKash from '../components/details/user-kash.component';
import AddDocument from '../components/forms/add-document.component';
import EditBankAccount from '../components/forms/edit-bank-account.component';
import CompanyProfile from '../components/forms/edit-company.component';
import EditUserInfo from '../components/forms/edit-info.component';
import EditUserProfile from '../components/forms/edit-profile.component';
import UserAccounts from '../components/tables/user-accounts-table.component';
import UserAffiliates from '../components/tables/user-affiliates.component';
// ASSETS
import IncompleteProfile from '../../../../assets/images/man-explaining.svg';

export const ClientDetailsScreen = (props) => {
  // VARIABLES & HOOKS
  const history = useHistory(),
    dispatch = useDispatch(),
    [modal, setModal] = useState(false),
    [modalType, setModalType] = useState(null),
    [coProfileDetails, setCoProfileDetails] = useState({}),
    [documentType, setDocumentType] = useState(''),
    [userBankAccEdit, setUserBankAccEdit] = useState({}),
    { id } = props.match.params,
    { details, accounts, affiliates, exchanges, withdrawals, isProcessing, isLoading, isDataLoading } = useSelector((state) => state.Clients),
    { completed, color } = useClientData(details);

  // EFFECTS
  useEffect(() => {
    dispatch(getClientDetails(id));
    dispatch(getClientAccounts(id));
    dispatch(getClientAffiliates(id));
  }, [dispatch, id]);

  // HANDLERS
  const openModal = (modalType, profileData = {}, document = '') => {
    setCoProfileDetails(profileData);
    setModalType(modalType);
    setModal(true);
    setDocumentType(document);
  };

  const closeModal = () => {
    setCoProfileDetails({});
    setModal(false);
    setUserBankAccEdit({});
  };
  const disableClientHandler = (id, active) => dispatch(disableClientInit(id, active));
  const getTransactions = () => dispatch(getClientExchanges(id));
  const getWithdrawals = () => dispatch(getClientWithdrawals(id));

  let ModalComponent;

  if (modalType === 'editUser') ModalComponent = <EditUserProfile dispatch={dispatch} userId={id} details={details} isProcessing={isProcessing} closeModal={closeModal} />;
  if (modalType === 'companyProfile')
    ModalComponent = <CompanyProfile dispatch={dispatch} userId={id} isProcessing={isProcessing} closeModal={closeModal} details={coProfileDetails} />;

  if (modalType === 'editInfo') ModalComponent = <EditUserInfo dispatch={dispatch} userId={id} isProcessing={isProcessing} details={details} closeModal={closeModal} />;
  if (modalType === 'addDocument') ModalComponent = <AddDocument dispatch={dispatch} userId={id} type={documentType} isProcessing={isProcessing} closeModal={closeModal} />;

  if (modalType === 'addBankAccount') ModalComponent = <AddBankAccount userId={id} closeModal={closeModal} />;
  if (modalType === 'editBankAccount')
    ModalComponent = <EditBankAccount dispatch={dispatch} userId={id} bankAccToEdit={userBankAccEdit} isProcessing={isProcessing} closeModal={closeModal} />;

  return (
    <div className='page-content'>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <>
          <Container fluid>
            <button type='button' onClick={() => history.goBack()} className='btn btn-blue waves-effect btn-label waves-light'>
              <i className='fas fa-arrow-left label-icon'></i> Regresar
            </button>
            <Row className='justify-center'>
              {details && <BasicInfo user={details} onDisable={disableClientHandler} openModal={openModal} />}
              {details?.completed && (
                <Col lg='6' xl='4'>
                  <ProfileInfo user={details} openModal={openModal} />
                  {+details?.level === 2 && <UserDocuments user={details} isProcessing={isProcessing} />}
                </Col>
              )}
              <ProfileCompleted user={details} completed={completed} color={color} />
            </Row>
            {details?.completed ? (
              <>
                <Row>
                  <CompanyInfo details={details} openModal={openModal} dispatch={dispatch} />
                  <UserAccounts
                    accounts={accounts}
                    isLoading={isLoading}
                    userBankAccEdit={userBankAccEdit}
                    setUserBankAccEdit={setUserBankAccEdit}
                    openModal={openModal}
                    closeModal={closeModal}
                    dispatch={dispatch}
                  />
                </Row>
                <>
                  <Row>
                    <UserAffiliates affiliates={affiliates} isLoading={isLoading} />
                    <UserKash kashQty={details?.kashAcumulated} />
                  </Row>
                  <Row>
                    <Col lg='6'>
                      <UserTransactions orders={exchanges} isLoading={isDataLoading} getTransactions={getTransactions} />
                    </Col>
                    <Col lg='6'>
                      <UserWithdrawals withdrawals={withdrawals} isLoading={isDataLoading} getWithdrawals={getWithdrawals} />
                    </Col>
                  </Row>
                </>
              </>
            ) : (
              <section className='flex flex-wrap justify-center items-center mx-auto'>
                <img src={IncompleteProfile} alt='Hombre explicando' className='mb-1.5' />
                <div className='text-center'>
                  <h4>Este usuario no ha completado su perfil</h4>
                  <p>Registrado el {moment(details?.createdAt).format('DD/MM/YYYY')}</p>
                </div>
              </section>
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
