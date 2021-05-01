import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Visibility, VisibilityOff, Edit, DeleteForever } from '@material-ui/icons';
import moment from 'moment';

import Table from '../../components/UI/Table';

const CouponsList = ({ coupons, isLoading, onForm, onDelete, onDisable }) => {
  const columns = [
    {
      field: 'couponName',
      title: 'Nombre',
    },
    {
      field: 'discount',
      title: 'Descuento',
    },
    {
      field: 'uses',
      title: 'usos',
    },
    {
      field: 'affiliates',
      title: '¿Solo afiliados?',
      render: (rowData) => <span className={`fa-lg fas ${rowData.affiliates ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'}`} />,
    },
    {
      field: 'profileType',
      title: 'Perfiles',
      render: (rowData) => <p>{rowData.profileType === 'natural' ? 'Cliente' : rowData.profileType === 'juridica' ? 'Empresa' : 'Todos'}</p>,
    },
    {
      field: 'minBuy',
      title: 'Mínimo ($)',
    },
    {
      field: 'minSell',
      title: 'Mínimo (S/.)',
    },
    {
      field: 'endDate',
      title: 'Vence en',
    },
    {
      field: 'actions',
      title: 'Acciones',
      render: (rowData) => (
        <div className='flex flex-wrap items-center'>
          {rowData.active ? (
            <VisibilityOff color='primary' className='m-2 cursor-pointer' onClick={() => onDisable(rowData.id, false)} />
          ) : (
            <Visibility color='primary' className='m-2 cursor-pointer' onClick={() => onDisable(rowData.id, true)} />
          )}
          <Edit color='secondary' className='m-2 cursor-pointer' onClick={() => onForm(rowData.id)} />
          <DeleteForever color='error' className='m-2 cursor-pointer' onClick={() => onDelete(rowData.id)} />
        </div>
      ),
    },
  ];

  const data = coupons.map((coupon) => ({
    id: coupon._id,
    couponName: coupon.name,
    discount: coupon.discount,
    uses: coupon.qty_uses,
    affiliates: coupon.affiliates,
    profileType: coupon.profileType,
    active: coupon.active,
    minBuy: coupon.minAmountBuy ? coupon.minAmountBuy : 0,
    minSell: coupon.minAmountSell ? coupon.minAmountSell : 0,
    endDate: moment(coupon.endDate).format('DD/MM/YYYY'),
  }));

  return (
    <Card>
      <CardBody>
        <Table
          columns={columns}
          rows={data}
          isLoading={isLoading}
          options={{ loadingType: 'linear' }}
          actions={[
            {
              icon: 'add',
              iconProps: { style: { color: '#fff' } },
              tooltip: 'Agregar cupón',
              onClick: () => onForm(),
              isFreeAction: true,
            },
          ]}
        />
      </CardBody>
    </Card>
  );
};

export default React.memo(CouponsList);
