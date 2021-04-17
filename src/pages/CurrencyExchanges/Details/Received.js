import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { checkInterplaza, formatAmount } from '../../../helpers/functions';

import CopyButton from '../../../components/UI/CopyButton';

const Sent = (props) => {
  const { details, isLoading } = props;
  let interplaza;

  if (details && checkInterplaza(details.bankSent, details.accountToRaw)) interplaza = true;

  return (
    <Card>
      <CardBody>
        {isLoading && <Loading />}
        {!isLoading && details && (
          <div>
            <div>
              <h5>Datos para enviar</h5>
              <div className='mb-2'>
                <img src={`${process.env.PUBLIC_URL}/images/banks/${details.bankSent}.svg`} alt={details.bankSent} width={20} />
                <span className='ml-2 text-muted'>
                  {details.bankSent} - {details.accTypeTo === 'savings' ? 'Ahorros' : 'Corriente'} {details.currencyReceived === 'PEN' ? 'Soles' : 'Dólares'}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardBody>
      <CardBody>
        {!isLoading && details && (
          <>
            <Row>
              <Col sm='6'>
                <div>
                  <p className='text-muted mb-2'>Tasa ofrecida</p>
                  <h5>{details.rate}</h5>
                </div>
              </Col>
              <Col sm='6'>
                <div className='text-sm-right mt-4 mt-sm-0'>
                  <p className='text-muted mb-2'>Factura generada</p>
                  <h5 className={`${details.billAssigned ? 'text-success' : 'text-warning'}`}>{details.billAssigned ? 'Generada' : 'No generada'}</h5>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <div>
                  <p className='text-muted mb-2'>Monto a enviar</p>
                  <h5>
                    {`${details.currencyReceived === 'PEN' ? 'S/.' : '$'} ${formatAmount(details.amountReceived)}`} <CopyButton textToCopy={details.amountReceived.toFixed(2)} />
                  </h5>
                </div>
              </Col>
              <Col sm='6'>
                <div className='text-sm-right mt-4 mt-sm-0'>
                  <p className='text-muted mb-2'>Cuenta no.</p>
                  <h5>
                    {details.accountToRaw} <CopyButton textToCopy={details.accountToRaw} />
                  </h5>
                  <small className='text-danger'>{interplaza && '* Parece que esta cuenta es interplaza. Por favor contactar al cliente'}</small>
                </div>
              </Col>
            </Row>
          </>
        )}
      </CardBody>
    </Card>
  );
};

const Loading = () => (
  <Col sm='8'>
    <SkeletonTheme color='#4444' highlightColor='#262b3c'>
      <Skeleton width={150} className='d-block my-2' />
      <Skeleton className='d-block my-2' width={100} />
      <Skeleton className='d-block my-2' width={100} />
    </SkeletonTheme>
  </Col>
);

export default React.memo(Sent);
