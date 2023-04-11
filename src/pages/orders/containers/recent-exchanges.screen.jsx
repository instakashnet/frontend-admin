import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { useRole } from '../../../hooks/useRole'
import { changeStatusInit } from '../../../store/actions'

// HELPERS
import { exchangesColumns } from '../../../helpers/tables/columns'

// COMPONENTS
import { Table } from '../../../components/UI/tables/table.component'
import { filterOrders } from '../../../helpers/filter-orders'
import { useWebsocket } from '../../../hooks/useWebsocket'

const PAGE_SIZE = 50
export const RecentExchangesScreen = () => {
  const dispatch = useDispatch()
  const [orders, setOrders] = useState([])
  const { token } = useSelector((state) => state.Login)
  const user = useSelector((state) => state.Login.user)
  const [role] = useRole(user)
  const { data, isLoading } = useWebsocket(token)

  useEffect(() => {
    const parsedData = JSON.parse(data)

    if (parsedData) {
      const filteredOrders = filterOrders(parsedData, orders, role)
      setOrders(filteredOrders)
    }
  }, [data, role])

  const onChangeStatus = (orderId, statusId) => dispatch(changeStatusInit(orderId, statusId))

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='12'>
            <Card>
              <CardBody>
                <div className='table-responsive'>
                  <Table
                    title='Ordenes recibidas'
                    columns={exchangesColumns({ onChangeStatus })}
                    data={orders}
                    isLoading={isLoading}
                    pagination={{ pageSize: PAGE_SIZE, async: false }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
