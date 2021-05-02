import React, { useState, useEffect, useRef } from 'react';
import { Card, CardBody, Badge, Col, Row, Container, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import { exchangeInstance } from '../../../helpers/AuthType/axios';
import { formatAmount } from '../../../helpers/functions';

//Components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import Table from '../../../components/UI/Table';

const Transactions = () => {
  const history = useHistory();
  const tableRef = useRef();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      tableRef.current && tableRef.current.onQueryChange();
    }, 60000);

    return () => clearInterval(interval);
  });

  const columns = [
    {
      title: 'Operación',
      field: 'pedidoId',
      cellStyle: { fontWeight: 'bold' },
      width: 150,
    },
    {
      title: 'Fecha',
      field: 'date',
    },
    {
      title: 'Usuario',
      field: 'user',
    },
    {
      title: 'Envia',
      field: 'amountSent',
      cellStyle: { fontWeight: 'bold' },
    },
    {
      title: 'Recibe',
      field: 'amountReceived',
      cellStyle: { fontWeight: 'bold' },
    },
    {
      title: 'O',
      field: 'originBank',
      render: (rowData) => <img width={80} src={`${process.env.PUBLIC_URL}/images/banks/${rowData.originBank}.svg`} alt='banco' />,
      width: 1 - 0,
    },
    {
      title: 'D',
      field: 'destinationBank',
      render: (rowData) => <img width={80} src={`${process.env.PUBLIC_URL}/images/banks/${rowData.destinationBank}.svg`} alt='banco' />,
      width: 100,
    },
    {
      title: 'F',
      field: 'invoice',
      render: (rowData) => <span className={`${rowData.invoice ? 'text-success' : 'text-warning'}`}>{rowData.invoice ? 'SI' : 'NO'}</span>,
      width: 100,
    },
    {
      title: 'Estado',
      field: 'status',
      width: 100,
      render: (rowData) => (
        <Badge className='btn py-2 font-size-12 px-3' style={{ color: '#FFF', backgroundColor: rowData.statusColor }} pill>
          {rowData.statusName}
        </Badge>
      ),
    },
    {
      title: 'Acción',
      field: 'action',
      width: 150,
      render: (rowData) => (
        <button className='btn-rounded waves-effect waves-light btn btn-blue btn-sm font-size-13' onClick={() => history.push(`/exchange-details/${rowData.id}`)}>
          Ver detalles
        </button>
      ),
    },
  ];

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='12'>
            <Breadcrumbs title='Transacciones' breadcrumbItem='Todas las operaciones' />

            <Card>
              <CardBody>
                <Button onClick={() => tableRef.current.onQueryChange()} className='mb-4 btn-primary'>
                  Actualizar operaciones
                </Button>
                <Table
                  ref={tableRef}
                  columns={columns}
                  isLoading={isLoading}
                  rows={(query) =>
                    new Promise(async (resolve) => {
                      const res = await exchangeInstance.get(`/order/admin?page=${query.page + 1}&qty=${query.search ? '10000000' : query.pageSize}&search=${query.search}`);

                      const orders = res.data.orders.map((order) => ({
                        id: order.id,
                        pedidoId: order.uuid,
                        date: moment(order.created).format('DD/MM/YY hh:mm a'),
                        user: order.firstName + ' ' + order.lastName,
                        amountSent: ` ${order.currencySent === 'PEN' ? 'S/.' : '$'} ${formatAmount(order.amountSent)}`,
                        amountReceived: `${order.currencyReceived === 'PEN' ? 'S/.' : '$'} ${formatAmount(order.amountReceived)}`,
                        originBank: order.bankFromName,
                        destinationBank: order.accToBankName,
                        statusName: order.stateName,
                        statusColor: order.stateColor,
                        invoice: order.billAssigned,
                      }));

                      setIsLoading(false);
                      resolve({
                        data: orders,
                        page: query.page,
                        totalCount: res.data.count,
                      });
                    })
                  }
                  options={{ sorting: true, loadingType: 'overlay', pageSize: 50, pageSizeOptions: [50, 100, 200] }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(Transactions);
