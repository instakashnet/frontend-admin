import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, Col, Container, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap'
import { getAllOrders } from '../../../api/services/exchange.service'
import { exchangesColumns } from '../../../helpers/tables/columns'
import { useRole } from '../../../hooks/useRole'
import { changeStatusInit, setAlert } from '../../../store/actions'

//Components
import { Table } from '../../../components/UI/tables/table.component'
import { BankReconciliation } from '../components/forms/bank-reconciliation.component'
import { CreateExcel } from '../components/forms/create-excel.component'
import { formatOrders } from '../../../helpers/filter-orders'

const PAGE_SIZE = 50

export const AllExchangesScreen = () => {
  const dispatch = useDispatch(),
    [modal, setModal] = useState(false),
    [isLoading, setIsLoading] = useState(true),
    [search, setSearch] = useState(null),
    [modalType, setModalType] = useState(''),
    [data, setData] = useState([]),
    isProcessing = useSelector((state) => state.CurrencyExchange.isProcessing),
    user = useSelector((state) => state.Login.user),
    [role] = useRole(user)

  const onCreateExcel = (type) => {
    setModalType(type)
    setModal(true)
  }

  const getTableData = useCallback(
    async (_, pageCount = 1) => {
      setIsLoading(true)

      try {
        const tableData = await getAllOrders(pageCount, search),
          orders = formatOrders(tableData)

        setData(orders)
      } catch (error) {
        dispatch(
          setAlert('danger', 'Ha ocurrido un error obteniendo la lista de órdenes. Por favor intenta de nuevo o contacta a soporte.')
        )
      } finally {
        setIsLoading(false)
      }
    },
    [dispatch, search, role]
  )

  // EFFECTS
  useEffect(() => {
    getTableData()
  }, [getTableData])

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

                {(role === 'admin' || role === 'officers' || role === 'accountant') && (
                  <Button onClick={() => onCreateExcel('conciliation')} className='mb-4 ml-4 btn-primary'>
                    Conciliar
                  </Button>
                )}
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
                    setSearch={setSearch}
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
            <CreateExcel dispatch={dispatch} isProcessing={isProcessing} excelType='orders' />
          ) : (
            <BankReconciliation dispatch={dispatch} isProcessing={isProcessing} />
          )}
        </ModalBody>
      </Modal>
    </div>
  )
}
