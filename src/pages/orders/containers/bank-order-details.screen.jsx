import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Modal, ModalBody, Row, Spinner } from 'reactstrap'
import { changeBankOrderStatus, getBankOrderDetails } from '../../../store/actions'

import Breadcrumbs from '../../../components/Common/Breadcrumb'

import { ActionButtons } from '../components/details/action-buttons.component'
import { Received } from '../components/details/bankOrders/received.component'
import { StatusInfo } from '../components/details/bankOrders/status.component'
import { ToSend } from '../components/details/bankOrders/to-send.component'
import { useState } from 'react'
import Input from '../../../components/UI/FormItems/Input'
import { useFormik } from 'formik'

export const BankOrderDetailsScreen = ({ match, history }) => {
  const { id } = match.params
  const { bankOrderDetails, isLoading, isProcessing } = useSelector((state) => state.bankOrdersReducer)
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const { values, errors, handleChange, touched, isValid, handleSubmit } = useFormik({
    initialValues: {
      transactionCode: ''
    },
    onSubmit: (values) => {
      dispatch(changeBankOrderStatus(id, 6, values, setModal))
    }
  })

  const onChangeStatus = (status) => {
    if (status === 6) return setModal(true)
    dispatch(changeBankOrderStatus(id, status))
    setModal(false)
  }

  useEffect(() => {
    dispatch(getBankOrderDetails(id))
  }, [dispatch, id])

  return (
    <div className='page-content'>
      <Container fluid>
        <Breadcrumbs title='Detalles del pedido' breadcrumbItem='Detalles del pedido a caja' />
        <Row>
          <Col lg='8'>
            <ActionButtons
              goBack={() => history.goBack()}
              statusId={bankOrderDetails.stateID}
              billCreated={bankOrderDetails.billAssigned}
              onChangeStatus={onChangeStatus}
              isProcessing={isProcessing}
            />
          </Col>
        </Row>
        <Row className='mb-3'>
          <StatusInfo details={bankOrderDetails} isLoading={isLoading} />
        </Row>
        <Row>
          <ToSend details={bankOrderDetails} isLoading={isLoading} />
          <Received details={bankOrderDetails} isLoading={isLoading} />
        </Row>
      </Container>

      <Modal isOpen={modal} role='dialog' autoFocus centered tabIndex='-1' toggle={() => setModal(false)}>
        <ModalBody>
          <form>
            <div className='flex justify-center w-full'>
              <Input
                name='transactionCode'
                value={values.transactionCode}
                onChange={handleChange}
                error={errors.transactionCode}
                touched={touched.transactionCode}
                label='Nro. de operación de ingreso'
              />
            </div>
            <div className='flex items-center justify-center'>
              <Button onClick={handleSubmit} type='submit' className='btn-primary my-3' disabled={!isValid}>
                {!true ? <Spinner size='sm' /> : 'Aprobar operación'}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      {/* <Dialog open={warning} onClose={() => setWarning(false)}>
        <div style={{ backgroundColor: '#262b3c', padding: 20 }}>
          <DialogTitle>¿Seguro que desea hacer esto?</DialogTitle>
          <DialogContent>
            <DialogContentText className='text-white'>
              La orden cambiará de status. <br /> Esta acción no puede ser revertida.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className='btn btn-danger' onClick={() => setWarning(false)}>
              Cancelar
            </button>
            <button className='btn btn-success' onClick={onConfirm} autoFocus>
              Aceptar
            </button>
          </DialogActions>
        </div>
      </Dialog> */}
    </div>
  )
}
