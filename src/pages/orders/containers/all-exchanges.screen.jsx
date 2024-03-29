import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, Col, Container, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap'
import { getOrders } from '../../../api/services/exchange.service'
import { exchangesColumns } from '../../../helpers/tables/columns'
import { useRole } from '../../../hooks/useRole'
import { changeStatusInit, setAlert } from '../../../store/actions'

//Components
import { Table } from '../../../components/UI/tables/table.component'
import { BankConciliation } from '../components/forms/bank-conciliation.component'
import { NewBankConciliation } from '../components/forms/new-bank-conciliation'
import { OrdersRelationForm } from '../components/forms/orders-relation.component'
import { formatOrders } from '../../../helpers/filter-orders'

const PAGE_SIZE = 50

export const AllExchangesScreen = () => {
  const dispatch = useDispatch(),
    [modal, setModal] = useState(false),
    [isLoading, setIsLoading] = useState(true),
    [modalType, setModalType] = useState(''),
    [data, setData] = useState([]),
    isProcessing = useSelector((state) => state.CurrencyExchange.isProcessing),
    user = useSelector((state) => state.Login.user),
    [role] = useRole(user)

  const onCreateExcel = (type) => {
    setModalType(type)
    setModal(true)
  }

  const getTableData = async (search, pageCount = 1) => {
    setIsLoading(true)

    try {
      const tableData = await getOrders(pageCount, 'E', search),
        orders = formatOrders(tableData?.orders ?? [])

      setData(orders)
    } catch (error) {
      dispatch(setAlert('danger', 'Ha ocurrido un error obteniendo la lista de órdenes. Por favor intenta de nuevo o contacta a soporte.'))
    } finally {
      setIsLoading(false)
    }
  }

  // EFFECTS
  useEffect(() => {
    getTableData()
  }, [])

  const onChangeStatus = (orderId, statusId) => dispatch(changeStatusInit(orderId, statusId))

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='12'>
            <div className='flex items-center'>
              <Button onClick={() => getTableData()} className='mb-4 btn-primary' disabled={isLoading}>
                {isLoading ? <Spinner size='sm' /> : 'Actualizar operaciones'}
              </Button>

              <div className='flex w-full ml-auto items-center justify-end'>
                {(role === 'admin' || role === 'officers' || role === 'accountant') && (
                  <Button onClick={() => onCreateExcel('relation')} className='mb-4 ml-4 btn-primary'>
                    Descargar relación
                  </Button>
                )}

                {/* {(role === 'admin' || role === 'officers' || role === 'accountant') && (
                  <div className='flex items-center gap-x-2'>
                    <Button onClick={() => onCreateExcel('conciliation')} className='mb-4 ml-4 btn-primary'>
                      Conciliar
                    </Button>
                    <Button onClick={() => onCreateExcel('newConciliation')} className='mb-4 ml-4 btn-primary'>
                      Conciliar nuevo
                    </Button>
                  </div>
                )} */}
              </div>
            </div>

            <Card>
              <CardBody>
                <div className='table-responsive'>
                  <Table
                    title='Órdenes recibidas'
                    columns={exchangesColumns({ onChangeStatus })}
                    data={data}
                    isLoading={isLoading}
                    getData={getTableData}
                    search
                    pagination={{ pageSize: PAGE_SIZE, async: true }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} role='dialog' autoFocus centered tabIndex='-1' toggle={() => setModal((prev) => !prev)}>
        <ModalHeader>{modalType === 'relation' ? 'Descargar relación' : 'Conciliar bancos'}</ModalHeader>
        <ModalBody>
          {modalType === 'relation' ? (
            <OrdersRelationForm dispatch={dispatch} isProcessing={isProcessing} excelType='orders' />
          ) : modalType === 'conciliation' ? (
            <BankConciliation dispatch={dispatch} isProcessing={isProcessing} />
          ) : (
            <NewBankConciliation dispatch={dispatch} isProcessing={isProcessing} />
          )}
        </ModalBody>
      </Modal>
    </div>
  )
}
