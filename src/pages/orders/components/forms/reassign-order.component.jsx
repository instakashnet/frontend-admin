import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Spinner } from 'reactstrap';
import CustomSelect from '../../../../components/UI/FormItems/CustomSelect';
import Select from '../../../../components/UI/FormItems/Select';
import { getClientAccounts, getOperatorsInit, reassignOrderInit } from '../../../../store/actions';

const ReassignOrder = ({ details, isProcessing, onShowForm }) => {
  const dispatch = useDispatch();
  const { operators, isLoading } = useSelector((state) => state.AdminUsers);
  const { userInfo } = details;
  const clientAccounts = useSelector((state) => state.Clients.accounts);
  const formik = useFormik({ initialValues: { operatorAssigned: '', accountId: '' }, onSubmit: (values) => dispatch(reassignOrderInit(values, details.id, onShowForm)) });

  useEffect(() => {
    dispatch(getOperatorsInit(true));
    dispatch(getClientAccounts(userInfo.userId));
  }, [dispatch, userInfo]);

  const operatorOptions = operators.map((operator) => ({ label: `${operator.name} - ${operator.email}`, value: operator.userId }));
  const clientAccountOptions = clientAccounts.map((clientAccount) => ({
    label: `${clientAccount.accountNumber || clientAccount.cci} - ${clientAccount.currency.Symbol}`,
    image: `/images/banks/${clientAccount.bank.name.toLowerCase()}.svg`,
    value: clientAccount.id,
  }));

  const onClientAccountChange = (option) => formik.setFieldValue('accountId', option.value);

  return (
    <Card>
      <CardBody>
        <h5 className='mb-4'>Reasignar operación</h5>
        {isLoading && <Spinner />}
        {!isLoading && (
          <form onSubmit={formik.handleSubmit}>
            <Select
              name='operatorAssigned'
              label='Selecciona un operador'
              onChange={formik.handleChange}
              options={operatorOptions}
              value={formik.values.operatorAssigned}
              error={formik.errors.operatorAssigned}
              touched={formik.touched.operatorAssigned}
            />
            <CustomSelect
              options={clientAccountOptions}
              label='Cuentas del cliente'
              onChange={onClientAccountChange}
              value={formik.values.accountId}
              error={formik.errors.accountId}
              touched={formik.touched.accountId}
            />
            <div className='flex justify-center mt-3'>
              <Button type='submit' className='btn-primary' disabled={!formik.isValid || isProcessing}>
                {isProcessing ? <Spinner size='sm' /> : 'Reasignar orden'}
              </Button>
            </div>
          </form>
        )}
      </CardBody>
    </Card>
  );
};

export default React.memo(ReassignOrder);
