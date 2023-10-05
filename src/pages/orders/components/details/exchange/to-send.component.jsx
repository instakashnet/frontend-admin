import { useFormik } from 'formik'
import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'
// HELPERS
import { checkInterplaza, convertRate, formatAmount } from '../../../../../helpers/functions'
// REDUX ACTIONS
import { editInterplazaInit } from '../../../../../store/actions'
// COMPONENTS
import CopyButton from '../../../../../components/UI/CopyButton'
import Radio from '../../../../../components/UI/FormItems/Radio'
import { SkeletonComponent } from '../../../../../components/UI/skeleton.component'
import { PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const Sent = ({ details, isLoading, isProcessing, onShowForm }) => {
  const dispatch = useDispatch(),
    [editState, setEditState] = useState(false),
    [interplaza, setInterplaza] = useState(false)

  // EFFECTS
  useEffect(() => {
    setInterplaza(details.accountToInfo?.accToInterbank)
  }, [details])

  // FORMIK
  const formik = useFormik({
    initialValues: { interbank: null, accountId: details.accountToInfo?.accountToId },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editInterplazaInit(values, 'exchange', details.id, setEditState))
  })

  console.log(details)

  return (
    <Col lg='5' xl='4'>
      <Card>
        {isLoading ? (
          <ToSendSkeleton />
        ) : (
          <>
            <CardBody className='relative'>
              <h5>Datos para enviar</h5>
              <hr />
              <div className='flex items-center justify-between'>
                <div className='mb-2 flex items-center'>
                  <img
                    src={`/images/banks/${details.banksInfo.bankSent?.toLowerCase()}.svg`}
                    alt={details.banksInfo.bankSent}
                    width={80}
                    className='mr-2'
                  />
                  <span className='text-muted'>
                    {details.currencyInfo.currencyReceivedSymbol} - {details.accountToInfo.accType === 'savings' ? 'ahorros' : 'corriente'}
                  </span>
                </div>
              </div>
              <button className='edit-button py-2 absolute top-3.5 right-3.5' onClick={() => onShowForm('reassign')}>
                <UserCircleIcon className='w-6 h-6' />
              </button>
            </CardBody>
            <CardBody>
              <Row>
                <Col sm='6'>
                  <div className='flex justify-start items-start'>
                    <div>
                      <p className='text-muted mb-2'>Tasa ofrecida</p>
                      <h5>{convertRate(details.rate)}</h5>
                    </div>
                    {details.stateInfo.stateId !== 6 && details.stateInfo.stateId !== 5 && (
                      <button className='edit-button py-2 ml-3' onClick={() => onShowForm('edit', 'rate')}>
                        <PencilSquareIcon className='w-6 h-6' />
                      </button>
                    )}
                  </div>
                </Col>
                <Col sm='6'>
                  <div className='text-sm-right mt-4 mt-sm-0'>
                    <p className='text-muted mb-2'>Factura generada</p>
                    <h5 className={`${details.billInfo.billAssigned ? 'text-success' : 'text-warning'}`}>
                      {details.billInfo.billAssigned ? 'Generada' : 'No generada'}
                    </h5>
                  </div>
                </Col>
              </Row>
              {details.transactionCodeFinalized && (
                <Row>
                  <Col>
                    <p className='text-muted mb-2'>Nro. de operación saliente</p>
                    <h5>{details.transactionCodeFinalized}</h5>
                  </Col>
                </Row>
              )}
              <Row className='mt-3'>
                <Col sm='6'>
                  <div>
                    <p className='text-muted mb-2'>Monto a enviar</p>
                    <h5>
                      {`${details.currencyInfo.currencyReceivedSymbol} ${formatAmount(details.amountReceived)}`}{' '}
                      <CopyButton textToCopy={details.amountReceived?.toFixed(2)} />
                    </h5>
                  </div>
                </Col>
                <Col sm='6'>
                  <div className='text-sm-right mt-4 mt-sm-0'>
                    <p className='text-muted mb-2'>Cuenta {details.accountToInfo?.jointAccount?.documentNumber ? 'mancomunada' : ''} no.</p>
                    <h5>
                      {details.accountToInfo?.accountNumber} <CopyButton textToCopy={details.accountToInfo?.accountNumber} />
                    </h5>
                    {editState && (
                      <form onSubmit={formik.handleSubmit}>
                        <p className='text-danger'>¿Esta cuenta es interplaza?</p>
                        <div className='flex justify-end'>
                          <Radio name='interbank' value={'1'} onChange={formik.handleChange} label='SI' />
                          <Radio name='interbank' value={'0'} onChange={formik.handleChange} label='NO' />
                        </div>
                        <Button
                          type='submit'
                          className={`btn-primary ld-ext-right ${isProcessing ? 'running' : ''}`}
                          disabled={!formik.values.interbank || isProcessing}
                        >
                          <span className='ld ld-ring ld-spin' />
                          Actualizar cuenta
                        </Button>
                      </form>
                    )}
                    {interplaza ? (
                      <small className='text-danger'>* Esta cuenta es de provincia.</small>
                    ) : checkInterplaza(details.banksInfo.bankSent, details.accountToInfo?.accountNumber) ? (
                      <small className='text-danger'>* Parece ser que esta cuenta es de provincia.</small>
                    ) : null}
                    {(checkInterplaza(details.banksInfo?.bankSent, details.accountToInfo?.accountNumber) || interplaza) && (
                      <button className='text-success mt-1 block ml-auto' onClick={() => setEditState((prev) => !prev)}>
                        editar <i className='fas fa-edit' />
                      </button>
                    )}
                  </div>
                </Col>
              </Row>
              {Boolean(details.accountToInfo?.thirdParty) && (
                <Row>
                  <Col className='mt-6'>
                    <hr />
                    <h5>Datos del tercero</h5>
                    <hr />
                    <Row>
                      <Col sm='6'>
                        <p className='text-muted mb-2'>Nombre completo</p>
                        <h5>
                          {details.accountToInfo?.thirdParty.thirdPartyAccType === 'juridica'
                            ? details.accountToInfo?.thirdParty.razonSocial
                            : details.accountToInfo?.thirdParty.name}
                        </h5>
                      </Col>
                      <Col sm='6'>
                        <div className='text-sm-right'>
                          <p className='text-muted mb-2'>Documento</p>
                          <h5>
                            {details.accountToInfo?.thirdParty.documentType} {details.accountToInfo?.thirdParty.documentNumber}
                          </h5>
                        </div>
                      </Col>
                      <Col sm='6' className='mt-3'>
                        <p className='text-muted mb-2'>Email</p>
                        <h5>{details.accountToInfo?.thirdParty.email}</h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
              {Boolean(details.accountToInfo?.jointAccount) && (
                <Row>
                  <Col className='mt-6'>
                    <hr />
                    <h5>Datos mancomunada</h5>
                    <hr />
                    <Row>
                      <Col sm='6'>
                        <p className='text-muted mb-2'>Nombre del titular</p>
                        <h5>{details.accountToInfo?.jointAccount.firstName + ' ' + details.accountToInfo?.jointAccount.lastName}</h5>
                      </Col>
                      <Col sm='6'>
                        <div className='text-sm-right'>
                          <p className='text-muted mb-2'>Documento</p>
                          <h5>
                            {details.accountToInfo?.jointAccount.documentType} {details.accountToInfo?.jointAccount.documentNumber}
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
            </CardBody>
          </>
        )}
      </Card>
    </Col>
  )
}

const ToSendSkeleton = () => {
  return (
    <div className='p-3'>
      <SkeletonComponent width={150} height={35} />
      <div className='flex items-center mt-12 mb-2 justify-between'>
        <SkeletonComponent width={90} height={35} />
        <SkeletonComponent width={90} height={35} />
      </div>
      <div className='flex items-center justify-between'>
        <SkeletonComponent width={100} height={35} />
        <SkeletonComponent width={100} height={35} />
      </div>
    </div>
  )
}

export default memo(Sent)
