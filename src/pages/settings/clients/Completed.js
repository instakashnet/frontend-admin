import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CloudDownload } from '@material-ui/icons';
import { Card, CardBody, Button } from 'reactstrap';
import moment from 'moment-timezone';
import { downloadClientsInit } from '../../../store/actions';
import { authInstance } from '../../../helpers/AuthType/axios';

import Table from '../../../components/UI/Table';

const Completed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const columns = [
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
  ];

  return (
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
          columns={columns}
          rows={(query) =>
            new Promise(async (resolve) => {
              const res = await authInstance.get(
                `/admin/users?type=client&page=${query.page + 1}&qty=${query.search ? '10000000' : query.pageSize}&completed=true${query.search ? `&search=${query.search}` : ''}`
              );

              const users = res.data.users.map((user) => ({
                id: user.id,
                userName: user.profiles.first_name + ' ' + user.profiles.last_name,
                email: user.email,
                document: user.profiles.document_type + ' ' + user.profiles.document_identification,
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
          title='Completados'
          isLoading={isLoading}
          options={{ pageSize: 10, pageSizeOptions: [10, 25, 50] }}
        />
      </CardBody>
    </Card>
  );
};

export default Completed;
