import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, Col, Container, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap'
import { getBankOrders } from '../../../api/services/exchange.service'
import { Table } from '../../../components/UI/tables/table.component'
import { bankOrdersColumns } from '../../../helpers/tables/columns'
import { getCbAccounts, setAlert } from '../../../store/actions'
import { CreateOrder } from '../components/forms/create-order.component'
import { formatBankOrders } from '../../../helpers/filter-orders'

const PAGE_SIZE = 20

export const BankOrdersScreen = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState(null)
  const [data, setData] = useState([])

  const { isProcessing } = useSelector((state) => state.bankOrdersReducer)
  const bankAccounts = useSelector((state) => state.BankAccounts.accounts)
  const currencies = useSelector((state) => state.Data.currencies)

  useEffect(() => {
    dispatch(getCbAccounts())
  }, [dispatch])

  const getTableData = useCallback(
    async (_, pageCount = 1) => {
      setIsLoading(true)

      try {
        const tableData = await getBankOrders(pageCount, search),
          orders = formatBankOrders(tableData)
        setData(orders)
      } catch (error) {
        console.log(error)
        dispatch(
          setAlert('danger', 'Ha ocurrido un error obteniendo la lista de ordenes. Por favor intenta de nuevo o contacta a soporte.')
        )
      } finally {
        setIsLoading(false)
      }
    },
    [dispatch, search]
  )

  useEffect(() => {
    getTableData()
  }, [getTableData])

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='12'>
            <div className='flex items-center justify-between mb-3 mx-3'>
              <Button onClick={() => {}} className='btn-primary' disabled={isLoading}>
                {isLoading ? <Spinner size='sm' /> : 'Actualizar operaciones'}
              </Button>

              <Button onClick={() => setModal(true)} className='btn-primary'>
                Crear pedido
              </Button>
            </div>
            <Card>
              <CardBody>
                <div className='table-responsive'>
                  <Table
                    title='Pedidos a caja'
                    columns={bankOrdersColumns}
                    data={data}
                    isLoading={isLoading}
                    getData={getTableData}
                    search
                    setSearch={setSearch}
                    pagination={{ pageSize: PAGE_SIZE }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} role='dialog' autoFocus centered tabIndex='-1' toggle={() => setModal((prev) => !prev)}>
        <ModalHeader>Nuevo pedido</ModalHeader>
        <ModalBody>
          <CreateOrder
            isProcessing={isProcessing}
            closeModal={() => setModal(false)}
            getTableData={getTableData}
            dispatch={dispatch}
            currencies={currencies}
            accounts={bankAccounts}
          />
        </ModalBody>
      </Modal>
    </div>
  )
}
