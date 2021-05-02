import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import moment from 'moment-timezone';
import { formatAmount } from '../../../../helpers/functions';

import CopyButton from '../../../../components/UI/CopyButton';

const Received = (props) => {
  const { isLoading, details } = props;

  return (
    <Card>
      <CardBody>
        <Row>
          {details && (
            <>
              <Col sm='8'>
                <div>
                  <div>
                    <h5>
                      Pedido {details.uuid} <CopyButton textToCopy={details.uuid} />
                    </h5>
                    <p className='text-muted mb-1'>{moment(details.created).format('DD/MM/YYYY HH:mm a')}</p>
                    {details.fundsOrigin && <p className='text-muted mb-0'>Origen de fondos: {details.fundsOrigin}</p>}
                  </div>
                </div>
              </Col>
              {(details.stateId === 3 || details.stateId === 4) && (
                <Col sm='4' className='d-flex justify-content-end align-items-start'>
                  <button className='btn' onClick={props.onEdiState}>
                    <i className='fas fa-edit' /> Editar
                  </button>
                </Col>
              )}
            </>
          )}
        </Row>
      </CardBody>
      <CardBody>
        {!isLoading && props.details && (
          <Row>
            <Col sm='6'>
              <div>
                <p className='text-muted mb-2'>Nro. de transferencia</p>
                <h5>
                  {details.transactionCode || 'Sin nro. de transferencia'} {details.transactionCode && <CopyButton textToCopy={details.transactionCode} />}
                </h5>
              </div>
            </Col>
          </Row>
        )}
        {!isLoading && props.details && (
          <Row>
            <Col sm='6'>
              <div>
                <p className='text-muted mb-2'>Monto recibido</p>
                <h5>{`${details.currencySent === 'USD' ? '$' : 'S/.'} ${formatAmount(details.amountSent)}`}</h5>
              </div>
            </Col>
            <Col sm='6'>
              <div className='text-sm-right mt-4 mt-sm-0'>
                <p className='text-muted mb-2'>Banco que recibe</p>
                <h5 className='flex items-center justify-end'>
                  <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankReceive}.svg`} alt={details.bankReceive} width={80} />
                  <span className='ml-2 text-muted'>{`${details.bankReceive} ${details.currencySent === 'USD' ? 'Dólares' : 'Soles'}`}</span>
                </h5>
              </div>
            </Col>
            {props.details.couponName && (
              <Col sm='6'>
                <div className='mt-4 mt-sm-0'>
                  <p className='text-muted mb-2'>Cupón usado</p>
                  <h5>{props.details.couponName}</h5>
                </div>
              </Col>
            )}
            {props.details.kashUsed > 0 && (
              <Col sm='6'>
                <div className='mt-4 mt-sm-0'>
                  <p className='text-muted mb-2'>KASH usados</p>
                  <h5>{props.details.kashUsed} KASH</h5>
                </div>
              </Col>
            )}
          </Row>
        )}
      </CardBody>
    </Card>
  );
};

export default React.memo(Received);
