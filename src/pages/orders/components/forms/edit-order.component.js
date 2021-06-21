import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editExchange } from '../../../../store/actions';
import { useFormik } from 'formik';
import { Card, CardBody, Button } from 'reactstrap';

import Input from '../../../../components/UI/FormItems/Input';

const EditTransaction = ({ details, onShowForm }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { transaction_code: details.transactionCode, rate: details.rate, amount_sent: details.amountSent },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editExchange(details.id, values, onShowForm)),
  });

  const { isProcessing } = useSelector((state) => state.CurrencyExchange);

  return (
    <Card>
      <CardBody>
        <h5>Editar operación</h5>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type='text'
            label='Nro. de transferencia'
            name='transaction_code'
            value={formik.values.transaction_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.transaction_code}
            touched={formik.touched.transaction_code}
          />
          <Input
            style={{ width: '40%' }}
            type='number'
            label='Tasa preferencial'
            name='rate'
            value={formik.values.rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.rate}
            touched={formik.touched.rate}
          />
          <Input
            type='number'
            label='Monto recibido'
            name='amount_sent'
            value={formik.values.amount_sent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.amount_sent}
            touched={formik.touched.amount_sent}
          />
          <Button type='submit' disabled={!formik.isValid || isProcessing} className={`btn-primary my-3 ld-ext-right ${isProcessing ? 'running' : ''}`}>
            <span className='ld ld-ring ld-spin' />
            Editar operación
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default React.memo(EditTransaction);