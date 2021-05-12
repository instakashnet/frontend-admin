import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import moment from 'moment';
import { authInstance } from '../../../helpers/AuthType/axios';

import Table from '../../../components/UI/Table';

const NotCompleted = () => {
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      field: 'email',
      title: 'Correo',
    },
    {
      field: 'phone',
      title: 'Teléfono',
      render: (rowData) => <p>{rowData.phone || 'Sin teléfono'}</p>,
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
        <Table
          columns={columns}
          rows={(query) =>
            new Promise(async (resolve) => {
              const res = await authInstance.get(
                `/admin/users?type=client&page=${query.page + 1}&qty=${query.search ? '10000000' : query.pageSize}&completed=false${query.search ? `&search=${query.search}` : ''}`
              );

              const users = res.data.users.map((user) => ({
                id: user.id,
                email: user.email,
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
          options={{ loadingType: 'linear', pageSize: 5, pageSizeOptions: [5, 10, 25] }}
        />
      </CardBody>
    </Card>
  );
};

export default NotCompleted;
