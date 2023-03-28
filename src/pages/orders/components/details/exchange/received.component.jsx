import moment from 'moment-timezone';
import { memo } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
// HELPERS
import { formatAmount } from '../../../../../helpers/functions';
// COMPONENTS
import CopyButton from '../../../../../components/UI/CopyButton';
import { SkeletonComponent } from '../../../../../components/UI/skeleton.component';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const Received = ({ details, isLoading, onShowForm }) => {
  return (
    <Col lg='5' xl='4'>
      <Card>
        {isLoading ? (
          <ReceivedSkeleton />
        ) : (
          <>
            <CardBody className='relative'>
              <h5>
                Pedido {details.uuid} <CopyButton textToCopy={details.uuid} />
              </h5>
              <p className='text-muted mb-1'>Creada: {moment(details.created).format('DD/MM/YYYY HH:mm a')}</p>
              {details.completedAt && <p className='text-muted mb-1'>En proceso desde: {moment(details.completedAt).format('DD/MM/YYYY HH:mm a')}</p>}
              {details.finalizedAt && <p className='text-muted mb-1'>Procesada en: {moment(details.finalizedAt).format('DD/MM/YYYY HH:mm a')}</p>}
              {details.fundsOrigin && <p className='text-muted mb-0'>Origen de fondos: {details.fundsOrigin}</p>}
            </CardBody>
            <CardBody>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='flex justify-between'>
                    <p className='text-muted mb-2'>Nro. de transferencia</p>
                    {details.stateInfo.stateId !== 6 && details.stateInfo.stateId !== 5 && (
                      <button className='edit-button ml-3 py-2' onClick={() => onShowForm('edit', 'transferNumber')}>
                        <PencilSquareIcon className='w-6 h-6' />
                      </button>
                    )}
                  </div>
                  {details.amountSent > 0 ? (
                    <h5>
                      {details.transactionCode ? (
                        <>
                          {details.transactionCode} <CopyButton textToCopy={details.transactionCode} />
                        </>
                      ) : (
                        'Sin nro. de transferencia'
                      )}
                    </h5>
                  ) : (
                    <h5>KASH usados</h5>
                  )}
                </div>

                <div>
                  <p className='text-muted mb-2'>Envía desde</p>
                  <h5 className='flex items-center'>
                    <img
                      src={`/images/banks/${details.amountSent > 0 ? details.banksInfo.bankFromName.toLowerCase() : 'kash'}.svg`}
                      alt={details.banksInfo.bankFromName}
                      width={details.amountSent > 0 ? 80 : 50}
                    />
                    <span className='ml-2 text-muted'>{details.amountSent > 0 ? details.currencyInfo.currencySentSymbol : 'KASH'}</span>
                  </h5>
                </div>
              </div>
              <div className='flex items-center justify-between mt-4'>
                <div className='flex flex-col'>
                  <div className='flex justify-between'>
                    <p className='text-muted mb-2'>Monto recibido</p>
                    {details.stateInfo.stateId !== 6 && details.stateInfo.stateId !== 5 && (
                      <button className='edit-button ml-3 py-2' onClick={() => onShowForm('edit', 'amountReceived')}>
                        <PencilSquareIcon className='w-6 h-6' />
                      </button>
                    )}
                  </div>
                  {details.kashInfo.kashUsed > 0 && (
                    <div className='mt-4 mt-sm-0'>
                      <h5>{details.kashInfo.kashUsed} KASH</h5>
                    </div>
                  )}
                  {details.amountSent > 0 && <h5>{`${details.currencyInfo.currencySentSymbol} ${formatAmount(details.amountSent)}`}</h5>}
                </div>
                {details.acountFromInfo?.accountNumber && (
                  <div>
                    <p className='text-muted mb-2'>Cuenta {details.acountFromInfo?.jointAccount?.documentNumber ? 'mancomunada' : ''} que envia</p>
                    <h5>{details.acountFromInfo?.accountNumber}</h5>
                  </div>
                )}
              </div>
              {details.couponName && (
                <div className='mt-4'>
                  <p className='text-muted mb-2'>Cupón usado</p>
                  <h5>{details.couponName}</h5>
                </div>
              )}

              {details.acountFromInfo?.jointAccount?.documentNumber && (
                <div className='flex items-center justify-between mt-6'>
                  <div>
                    <p className='text-muted mb-2'>Nombre del titular</p>
                    <h5>{details.acountFromInfo?.jointAccount?.firstName + ' ' + details.acountFromInfo?.jointAccount.lastName}</h5>
                  </div>
                  <div>
                    <div className='text-sm-right'>
                      <p className='text-muted mb-2'>Documento</p>
                      <h5>
                        {details.acountFromInfo?.jointAccount?.documentType} {details.acountFromInfo?.jointAccount.documentNumber}
                      </h5>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </>
        )}
      </Card>
    </Col>
  );
};

const ReceivedSkeleton = () => {
  return (
    <div className='p-3'>
      <SkeletonComponent height={35} width={190} />
      <SkeletonComponent height={35} width={230} />
      <SkeletonComponent height={35} width={260} />
      <div className='flex items-center my-4 justify-between'>
        <SkeletonComponent height={35} width={120} />
        <SkeletonComponent height={35} width={80} />
      </div>
      <SkeletonComponent height={35} width={100} />
    </div>
  );
};

export default memo(Received);
