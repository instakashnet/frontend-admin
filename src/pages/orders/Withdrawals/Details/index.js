import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Badge, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { getWithdrawalDetailsInit, changeWithdrawalStatusInit } from '../../../../store/actions';

import UserInfo from './UserInfo';
import WithdrawalInfo from './WithdrawalInfo';
import LoadingPage from '../../../LoadingPage';
import CompleteOrder from '../../Forms/CompleteOrder';

const Details = ({ match, history }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = match.params;

  const toggleModal = () => setModal((prev) => !prev);

  const { details, isLoading, isProcessing } = useSelector((state) => state.Withdrawals);

  useEffect(() => {
    dispatch(getWithdrawalDetailsInit(id));
  }, [dispatch, id]);

  const declineWithdrawalHandler = () => dispatch(changeWithdrawalStatusInit(details.id, 5));
  const approveWithdrawalHandler = (values) => dispatch(changeWithdrawalStatusInit(details.id, 6, values, toggleModal));

  console.log(details);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='8' xl='6'>
            <div className='d-flex align-items-center justify-content-between'>
              <button type='button' onClick={() => history.goBack()} className='btn btn-blue waves-effect btn-label waves-light'>
                <i className='fas fa-arrow-left label-icon'></i> Regresar
              </button>
              {details.statusID !== 5 && details.statusID !== 6}
              {details.statusID === 4 && (
                <div className='flex items-center'>
                  <button type='button' onClick={declineWithdrawalHandler} className='btn btn-danger waves-effect btn-label mr-3 waves-light' disabled={isProcessing}>
                    <i className='fas fa-times label-icon'></i> Cancelar
                  </button>
                  <button type='button' onClick={() => setModal(true)} className='btn btn-primary waves-effect btn-label waves-light' disabled={isProcessing}>
                    <i className='fas fa-check label-icon'></i> Aprobar
                  </button>
                </div>
              )}
            </div>
            <UserInfo details={details} />
          </Col>
        </Row>
        <Row>
          <Col lg='8' xl='6' className='d-flex justify-content-end mb-3'>
            <Badge className='py-2 font-size-15 px-5' style={{ color: '#fff', backgroundColor: details.statusColor }}>
              {details.statusName}
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col lg='8' xl='6'>
            <WithdrawalInfo details={details} isProcessing={isProcessing} />
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} role='dialog' autoFocus={true} centered={true} tabIndex='-1' toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Adjunta el comprobante de pago</ModalHeader>
        <ModalBody>
          <CompleteOrder isProcessing={isProcessing} orderId={id} onApprove={approveWithdrawalHandler} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Details;
