import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Spinner } from 'reactstrap';
import AsyncSelect from '../../../../../components/UI/FormItems/AsyncSelect';
import Checkbox from '../../../../../components/UI/FormItems/Checkbox';
import Input from '../../../../../components/UI/FormItems/Input';
import Select from '../../../../../components/UI/FormItems/Select';
import { couponValidations } from '../../../../../helpers/forms/validation';
import { addCouponInit, editCouponInit, getCouponsDetailsInit } from '../../../../../store/actions';

const EditCoupon = ({ couponId, isProcessing, onShowForm, clients }) => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.Coupons.couponDetails);
  const [usersList, setUsersList] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: details.name || '',
      discount: details.discount || '',
      qty_uses: details.qtyUses || '',
      affiliates: details.affiliates || false,
      indefinite: details.endDate <= 0 || false,
      users: details.users && details.users.length > 0 ? details.users : [],
      endDate: details.endDate ? moment(details.endDate).format('YYYY-MM-DD') : '',
      minAmountBuy: details.minAmountBuy || '',
      profileType: details.profileType || 'all',
      isLevelEnabled: !!details.isLevelEnabled,
      levelName: details.levelName || '',
    },
    enableReinitialize: true,
    validationSchema: couponValidations,
    onSubmit: (values) => (couponId ? dispatch(editCouponInit(couponId, values, details.active, onShowForm)) : dispatch(addCouponInit(values, onShowForm))),
  });

  useEffect(() => {
    dispatch(getCouponsDetailsInit(couponId));
  }, [dispatch, couponId]);

  const profilesOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'natural', label: 'Cliente' },
    { value: 'juridica', label: 'empresa' },
  ];

  const userLevelOptions = [
    { value: 'KASH JUNIOR', label: 'KASH JUNIOR' },
    { value: 'KASH SENIOR', label: 'KASH SENIOR' },
    { value: 'KASH EXPERTO', label: 'KASH EXPERTO' },
  ];

  const onClientChange = (options) => {
    if (!options) return;

    const clients = options.map((option) => option.value);
    formik.setFieldValue('users', clients);
  };

  return (
    <Card>
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <Input
            name='name'
            type='text'
            label='Nombre del cupón'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.name}
            touched={formik.touched.name}
          />
          <div className='flex items-center justify-between'>
            <Input
              name='qty_uses'
              type='number'
              label='Usos'
              value={formik.values.qty_uses}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.qty_uses}
              touched={formik.touched.qty_uses}
            />
            <Input
              name='discount'
              type='number'
              label='Descuento'
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.discount}
              touched={formik.touched.discount}
            />
          </div>
          <legend className='mt-2 text-base text-gray-400'>Lógica opcional</legend>
          <hr />
          <Checkbox name='isLevelEnabled' label='¿Usado para nivel de usuario?' onChange={formik.handleChange} value={formik.values.isLevelEnabled} />
          {formik.values.isLevelEnabled && (
            <Select name='levelName' label='Nivel de usuario' value={formik.values.levelName} onChange={formik.handleChange} options={userLevelOptions} />
          )}
          <Input
            name='minAmountBuy'
            type='number'
            label='Monto mínimo ($)'
            value={formik.values.minAmountBuy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.minAmountBuy}
            touched={formik.touched.minAmountBuy}
          />
          {!formik.values.indefinite && (
            <Input name='endDate' type='date' label='Fecha de expiración' value={formik.values.endDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          )}
          <Checkbox name='indefinite' label='¿Fecha indefinida?' onChange={formik.handleChange} value={formik.values.indefinite} />
          <Select name='profileType' label='Perfil de uso' value={formik.values.profileType} onChange={formik.handleChange} options={profilesOptions} />
          <Checkbox name='indefinite' label='¿Asignado a un usuario?' onChange={() => setUsersList((prev) => !prev)} value={usersList} />
          {usersList && (
            <AsyncSelect placeholder='selecciona usuarios' label='Asignación a usuarios' options={clients} onChange={onClientChange} value={formik.values.clients} isMulti />
          )}

          <div className='mt-2 flex justify-center'>
            <Button type='submit' disabled={!formik.isValid || isProcessing} color='primary'>
              {isProcessing ? <Spinner size='sm' /> : couponId ? 'Editar cupón' : 'Agregar cupón'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default React.memo(EditCoupon);
