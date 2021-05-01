import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardBody, Button } from 'reactstrap';
import { useFormik } from 'formik';
import { editCbAccount } from '../../../store/actions';
import Input from '../../../components/UI/FormItems/Input';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

const EditAccount = (props) => {
  const { account } = props;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { accountId: account.id, account_number: account.accNumber, balance: account.balanceNumber, cci: account.cci },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editCbAccount(values, props.setEditState)),
  });

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Cuentas' breadcrumbItem='Editar cuenta' />
      <Card>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <Input
              name='account_number'
              label='Cuenta bancaria'
              type='text'
              value={formik.values.account_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.account_number}
              touched={formik.touched.account_number}
            />
            <Input
              name='cci'
              label='Cuenta interbancaria'
              type='text'
              value={formik.values.cci}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.cci}
              touched={formik.touched.cci}
            />
            <Input name='balance' type='number' value={formik.values.balance} onChange={formik.handleChange} onBlur={formik.handleBlur} />

            <Button className={`btn-primary ld-ext-right ${props.isProcessing ? 'running' : ''}`} disabled={props.isProcessing} type='submit'>
              <span className='ld ld-ring ld-spin' />
              Editar cuenta
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default React.memo(EditAccount);
