import React from 'react';
import { Card, CardBody } from 'reactstrap';

import Breadcrumbs from '../../../components/Common/Breadcrumb';
import Table from '../../../components/UI/Table';

const StatusTable = (props) => {
  const data = {
    columns: [
      {
        field: 'id',
        title: 'ID',
      },
      {
        field: 'name',
        title: 'Nombre',
      },
      {
        field: 'color',
        title: 'Color',
        render: (rowData) => <span className='status-color' style={{ backgroundColor: rowData.color }} />,
      },
    ],
    rows:
      props.data.length > 0
        ? props.data.map((status) => ({
            id: status.id,
            name: status.name,
            color: status.color,
          }))
        : [],
  };

  return (
    <>
      <Breadcrumbs title='status' breadcrumbItem='Estados transacciones' />
      <Card>
        <CardBody>
          <Table
            columns={data.columns}
            rows={data.rows}
            actions={[
              {
                icon: 'edit',
                iconProps: { style: { color: '#f1b44c' } },
                tooltip: 'Editar estado',
                onClick: (e, rowData) => props.setEdit(rowData),
              },
            ]}
            options={{ paging: false }}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(StatusTable);
