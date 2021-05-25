import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import { getExchangeDetails, createInvoice, approveExchange, validateExchange, declineExchange } from '../../../../store/actions';
import { Container, Row, Col, Badge, Modal, ModalBody, ModalHeader } from 'reactstrap';

import Breadcrumbs from '../../../../components/Common/Breadcrumb';

import User from './User';
import Received from './Received';
import Sent from './Sent';
import Transactions from './OldTransactions';
import CompleteOrder from '../../Forms/CompleteOrder';
import EditOrder from '../Forms/EditOrder';
import ReassignOrder from '../Forms/ReassignOrder';
import Revision from './Revision';
import Alert from '../../../../components/UI/Alert';
import LoadingPage from '../../../../pages/LoadingPage';

const ExchangeDetails = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = props.match.params;
  const [modal, setModal] = useState(false);
  const [formType, setFormType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [revision, setRevision] = useState(false);
  const { details, isLoading, isProcessing, error, success } = useSelector((state) => state.CurrencyExchange);
  const user = useSelector((state) => state.Login.user);

  const { exchanges, isLoading: dataLoading } = useSelector((state) => state.Clients);

  const showFormHandler = (formType = null) => {
    setShowForm((prev) => !prev);
    setFormType(formType);
  };

  const toggleModal = () => setModal((prev) => !prev);

  const changeStatusHandler = () => {
    if (details.stateId === 3) return dispatch(validateExchange(details.id, history));
    setModal(true);
  };
  const onDeclineExchange = () => dispatch(declineExchange(details.id, history));
  const onApproveExchange = (values) => dispatch(approveExchange(id, values, toggleModal));
  const onCreateInvoice = () => dispatch(createInvoice(id));

  useEffect(() => {
    dispatch(getExchangeDetails(id));
  }, [dispatch, id]);

  let FormComponent;

  if (formType === 'edit') FormComponent = <EditOrder details={details} onShowForm={setShowForm} />;
  if (formType === 'reassign') FormComponent = <ReassignOrder details={details} onShowForm={setShowForm} isProcessing={isProcessing} />;

  return (
    <div className='page-content'>
      <Container fluid>
        {isLoading || (dataLoading && <LoadingPage />)}
        {error && <Alert color='danger' error={error} />}
        {success && <Alert color='success' error={success} />}
        {!isLoading && !dataLoading && (
          <>
            <Breadcrumbs title='Detalles del cambio' breadcrumbItem='Detalles del cambio de divisa' />
            <Row>
              <Col lg='8'>
                <div className='d-flex align-items-center justify-content-between'>
                  <button type='button' onClick={() => history.goBack()} className='btn btn-blue waves-effect btn-label waves-light'>
                    <i className='fas fa-arrow-left label-icon'></i> Regresar
                  </button>
                  <div>
                    {details && (details.stateId === 2 || details.stateId === 3 || details.stateId === 4) && user.role !== 'ROLE_OPERATOR' && (
                      <button type='button' disabled={isProcessing} onClick={onDeclineExchange} className='btn btn-danger waves-effect btn-label mr-3 waves-light'>
                        <i className='fas fa-times label-icon'></i> Cancelar
                      </button>
                    )}
                    {details && (details.stateId === 3 || details.stateId === 4) && (
                      <button type='button' disabled={isProcessing} onClick={changeStatusHandler} className='btn btn-primary waves-effect btn-label waves-light'>
                        <i className='fas fa-check label-icon'></i> {details.stateId === 3 ? 'Validar' : 'Aprobar'}
                      </button>
                    )}
                    {details && details.stateId === 6 && !details.billAssigned && (
                      <button type='button' disabled={isProcessing} onClick={onCreateInvoice} className='btn btn-primary waves-effect btn-label waves-light'>
                        <i className='fas fa-file-invoice label-icon'></i> Generar factura
                      </button>
                    )}
                  </div>
                </div>
                <User details={details} isLoading={isLoading} />
              </Col>
              {(details.stateId === 3 || details.stateId === 4) && (
                <Col lg='4'>{(revision || details.orderNotes) && <Revision note={details.orderNotes} isProcessing={isProcessing} setRevision={setRevision} orderId={id} />}</Col>
              )}
            </Row>
            <Row className='mb-3'>
              <Col lg='8' className='d-flex justify-content-between items-center'>
                {details && (
                  <p className='mb-0'>
                    <span className='text-muted mr-1'>Operador asignado: </span> {details.operatorName || 'Sin asignar'}
                  </p>
                )}
                {details && (
                  <div className='flex flex-col items-end'>
                    <Badge className='py-2 font-size-15 px-5' style={{ color: '#fff', backgroundColor: details.stateColor }}>
                      {`${details.stateNme} ${details.orderNotes ? ' - EN REVISIÓN' : ''}`}
                    </Badge>
                    {(details.stateId === 3 || details.stateId === 4) && (
                      <button type='button' className='mt-2' onClick={() => setRevision((prev) => !prev)}>
                        <Edit fontSize='small' className='mr-1' /> {details.orderNotes ? 'Editar' : 'Agregar'} revisión
                      </button>
                    )}
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg='5' xl='4'>
                <Sent details={details} onShowForm={showFormHandler} isLoading={isLoading} />
              </Col>
              <Col lg='5' xl='4'>
                <Received details={details} onShowForm={showFormHandler} isProcessing={isProcessing} isLoading={isLoading} />
              </Col>
              {showForm && <Col lg='5'>{FormComponent}</Col>}
            </Row>
            <Row>
              <Col lg='10' xl='8'>
                <Transactions isLoading={dataLoading} details={details} orders={exchanges} />
              </Col>
            </Row>
          </>
        )}
      </Container>
      <Modal isOpen={modal} role='dialog' autoFocus={true} centered={true} tabIndex='-1' toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Adjunta el comprobante de pago</ModalHeader>
        <ModalBody>
          <CompleteOrder isProcessing={isProcessing} orderId={id} onApprove={onApproveExchange} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ExchangeDetails;
