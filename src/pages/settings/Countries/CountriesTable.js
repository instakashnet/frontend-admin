import React from 'react';
import { Card, CardBody } from 'reactstrap';

import Breadcrumbs from '../../../components/Common/Breadcrumb';
import Table from '../../../components/UI/Table';

const CountriesTable = (props) => {
  const data = {
    columns: [
      {
        field: 'countryName',
        title: 'Nombre del país',
      },
      {
        field: 'countryCode',
        title: 'Código del país',
      },
      {
        field: 'active',
        title: 'Activo',
        render: (rowData) => <span className={`fa-lg ${rowData.active ? 'fas fa-check-circle text-success' : 'fas fa-times-circle text-danger'}`} />,
      },
    ],
    rows: [],
  };

  return (
    <>
      <Breadcrumbs title='Paises' breadcrumbItem='Paises en funcionamiento' />
      <Card>
        <CardBody>
          <Table
            columns={data.columns}
            rows={data.rows}
            isLoading={props.isLoading}
            options={{ loadingType: 'linear', paging: false }}
            actions={[
              {
                icon: 'delete',
                iconProps: { style: { color: '#f46a6a' } },
                tooltip: 'Desactivar país',
                onClick: (e, rowData) => console.log(rowData),
              },
            ]}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default CountriesTable;
