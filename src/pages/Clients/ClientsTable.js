import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { CloudDownload } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { downloadClientsInit } from '../../store/actions';
import moment from 'moment-timezone';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import Table from '../../components/UI/Table';

const UsersTable = (props) => {
  const dispatch = useDispatch();

  const data = {
    columns: [
      {
        field: 'userName',
        title: 'Nombre',
      },
      {
        field: 'email',
        title: 'Correo',
      },
      {
        field: 'document',
        title: 'Documento',
      },
      {
        field: 'phone',
        title: 'Teléfono',
      },
      {
        field: 'date',
        title: 'Fecha registrado',
      },
      {
        field: 'status',
        title: 'Estado',
        render: (rowData) => <span className={rowData.status ? 'text-warning' : 'text-success'}>{rowData.status ? 'NO ACTIVO' : 'ACTIVO'}</span>,
      },
      {
        title: 'Acción',
        field: 'action',
        width: 150,
        render: (rowData) => (
          <Link to={`/registered-users/${rowData.id}`} className='btn-rounded waves-effect waves-light btn btn-blue btn-sm font-size-13'>
            Ver detalles
          </Link>
        ),
      },
    ],
    rows: [],
  };

  if (props.clients.length > 0) {
    data.rows = props.clients.reverse().map((client) => ({
      id: client.id,
      userName: client.profiles[0].first_name + ' ' + client.profiles[0].last_name,
      email: client.email,
      document: client.profiles[0].document_type + ' ' + client.profiles[0].document_identification,
      phone: client.phone,
      date: moment(client.createdAt).format('DD/MM/YY HH:mm a'),
      status: +client.active,
    }));
  }

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Usuarios' breadcrumbItem='Usuarios registrados' />

      <Row>
        <Col className='col-12'>
          <Card>
            <CardBody>
              <Button type='button' className='btn-primary mb-3' onClick={() => dispatch(downloadClientsInit())}>
                Empresas <CloudDownload className='ml-2' />
              </Button>
              <Table
                columns={data.columns}
                rows={data.rows}
                isLoading={props.isLoading}
                options={{ loadingType: 'linear', exportButton: true, pageSize: 10, pageSizeOptions: [10, 25, 100] }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(UsersTable);
