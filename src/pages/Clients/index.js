import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CloudDownload } from '@material-ui/icons';
import moment from 'moment-timezone';
import { downloadClientsInit } from '../../store/actions';
import { authInstance } from '../../helpers/AuthType/axios';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import Table from '../../components/UI/Table';

const UsersTable = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        render: (rowData) => <span className={!rowData.status ? 'text-warning' : 'text-success'}>{!rowData.status ? 'NO ACTIVO' : 'ACTIVO'}</span>,
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

  return (
    <div className='page-content'>
      <div className='container-fluid'>
        <Breadcrumbs title='Usuarios' breadcrumbItem='Usuarios registrados' />

        <Row>
          <Col className='col-12'>
            <Card>
              <CardBody>
                <div className='flex items-center'>
                  <Button type='button' className='btn-primary mb-3' onClick={() => dispatch(downloadClientsInit('companies'))}>
                    Obtener empresas <CloudDownload className='ml-2' />
                  </Button>
                  <Button type='button' className='btn-primary ml-3 mb-3' onClick={() => dispatch(downloadClientsInit('clients'))}>
                    Obtener clientes <CloudDownload className='ml-2' />
                  </Button>
                </div>
                <Table
                  columns={data.columns}
                  rows={(query) =>
                    new Promise(async (resolve) => {
                      const res = await authInstance.get(
                        `/admin/users?type=client&page=${query.page + 1}&qty=${query.search ? '10000000' : query.pageSize}${query.search ? `&search=${query.search}` : ''}`
                      );

                      const users = res.data.users.map((user) => ({
                        id: user.id,
                        userName: user.profiles[0].first_name + ' ' + user.profiles[0].last_name,
                        email: user.email,
                        document: user.profiles[0].document_type + ' ' + user.profiles[0].document_identification,
                        phone: user.phone,
                        date: moment(user.createdAt).format('DD/MM/YY HH:mm a'),
                        status: !!+user.active,
                      }));

                      setIsLoading(false);
                      resolve({
                        data: users,
                        page: query.page,
                        totalCount: res.data.count,
                      });
                    })
                  }
                  isLoading={isLoading}
                  options={{ loadingType: 'linear', pageSize: 10, pageSizeOptions: [10, 25, 100] }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(UsersTable);
