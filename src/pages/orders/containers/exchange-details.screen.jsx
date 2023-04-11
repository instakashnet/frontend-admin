import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
// CUSTOM HOOKS
import { useRole } from '../../../hooks/useRole'
// REDUX ACTIONS
import {
  changeOrderStatus,
  changeStatusInit,
  createInvoice,
  getClientExchanges,
  getExchangeDetails,
  processOrderInit,
  setRevisionInit
} from '../../../store/actions'
// COMPONENTS
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import { ActionButtons } from '../components/details/action-buttons.component'
import Received from '../components/details/exchange/received.component'
import { StatusInfo } from '../components/details/exchange/status.component'
import ToSend from '../components/details/exchange/to-send.component'
import { UserTransactions } from '../components/details/exchange/user-transactions.component'
import { RevisionNote } from '../components/details/revision-note.component'
import UserInfo from '../components/details/user-details.component'
import CompleteOrder from '../components/forms/complete-order.component'
import EditOrder from '../components/forms/edit-order.component'
import ReassignOrder from '../components/forms/reassign-order.component'
import SetRevision from '../components/forms/set-revision.component'

export const ExchangeDetailsScreen = ({ match }) => {
  // VARIABLES & HOOKS
  const { id } = match.params
  const { details, isLoading, isProcessing } = useSelector((state) => state.CurrencyExchange)
  const { exchanges, isLoading: dataLoading } = useSelector((state) => state.Clients)
  const user = useSelector((state) => state.Login.user)

  const dispatch = useDispatch()
  const history = useHistory()
  const [modal, setModal] = useState(false)
  const [warning, setWarning] = useState(false)
  const [toChangeStatus, setToChangeStatus] = useState(null)
  const [formType, setFormType] = useState(null)
  const [orderItemEdit, setOrderItemEdit] = useState('')
  const [role] = useRole(user)

  // HANDLERS
  const showFormHandler = (formType = null, orderItemEdit = '') => {
    setModal((prev) => !prev)
    setFormType(formType)
    setOrderItemEdit(orderItemEdit)
  }

  const changeStatusHandler = (status) => {
    if (status === 6) return showFormHandler('complete')

    setToChangeStatus(status)
    setWarning(true)
  }
  const onApproveExchange = (values) => dispatch(processOrderInit(id, values, showFormHandler))
  const onCreateInvoice = () => dispatch(createInvoice(id))
  const onSetReview = () => {
    let valuesRevision = {
      note: details.orderNotes,
      inReview: !details.inReview
    }

    dispatch(setRevisionInit(valuesRevision, id))
  }

  const onConfirm = () => dispatch(changeStatusInit(details.id, toChangeStatus, setWarning))

  // EFFECTS
  useEffect(() => {
    dispatch(getExchangeDetails(id))
  }, [dispatch, id])

  let FormComponent

  if (formType === 'edit')
    FormComponent = <EditOrder details={details} isProcessing={isProcessing} onShowForm={showFormHandler} orderItemToEdit={orderItemEdit} />
  if (formType === 'reassign') FormComponent = <ReassignOrder details={details} onShowForm={showFormHandler} isProcessing={isProcessing} />
  if (formType === 'complete')
    FormComponent = <CompleteOrder isProcessing={isProcessing} orderId={id} onShowForm={showFormHandler} onApprove={onApproveExchange} />
  if (formType === 'revision')
    FormComponent = (
      <SetRevision
        note={details.orderNotes}
        inReview={details.inReview}
        isProcessing={isProcessing}
        onShowForm={showFormHandler}
        orderId={id}
      />
    )

  return (
    <div className='relative'>
      <div className='page-content'>
        <Container fluid>
          <Breadcrumbs title='Detalles del cambio' breadcrumbItem='Detalles del cambio de divisa' />
          <Row>
            <Col lg='8'>
              <ActionButtons
                goBack={() => history.goBack()}
                statusId={details.stateInfo?.stateId}
                billCreated={details.billInfo?.billAssigned}
                onCreateInvoice={onCreateInvoice}
                onChangeStatus={changeStatusHandler}
                isProcessing={isProcessing}
                role={role}
                hasInvoice
              />
              {details.userInfo && <UserInfo user={details.userInfo} role={role} isLoading={isLoading} />}
            </Col>
            {details.orderNotes && (
              <Col lg='4'>
                <RevisionNote note={details.orderNotes} onEdit={() => showFormHandler('revision')} />
              </Col>
            )}
          </Row>
          <StatusInfo
            onShowForm={() => showFormHandler('revision')}
            status={details.stateInfo}
            operator={details.operatorInfo}
            inReview={details.inReview}
            note={details.orderNotes}
            isProcessing={isProcessing}
            isLoading={isLoading}
            onSetReview={onSetReview}
          />

          <Row>
            <Received details={details} onShowForm={showFormHandler} isLoading={isLoading} />
            <ToSend details={details} isLoading={isLoading} isProcessing={isProcessing} onShowForm={showFormHandler} />
          </Row>
          <Row>
            <Col lg='10' xl='8'>
              <UserTransactions
                getTransactions={() => dispatch(getClientExchanges(details.userInfo?.userId))}
                isLoading={dataLoading || isLoading}
                orders={exchanges}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Modal isOpen={modal} role='dialog' autoFocus centered tabIndex='-1' toggle={showFormHandler}>
        <ModalHeader toggle={showFormHandler}>Formulario</ModalHeader>
        <ModalBody>{FormComponent}</ModalBody>
      </Modal>

      <Dialog open={warning} onClose={() => setWarning(false)}>
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
      </Dialog>
    </div>
  )
}
