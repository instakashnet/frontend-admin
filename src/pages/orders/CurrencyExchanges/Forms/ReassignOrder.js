import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, Spinner, Button } from 'reactstrap';
import { getOperatorsInit, getClientAccounts, reassignOrderInit } from '../../../../store/actions';

import Select from '../../../../components/UI/FormItems/Select';
import CustomSelect from '../../../../components/UI/FormItems/CustomSelect';

const ReassignOrder = ({ details, isProcessing, onShowForm }) => {
  const dispatch = useDispatch();
  const { operators, isLoading } = useSelector((state) => state.AdminUsers);
  const { userId } = details;
  const clientAccounts = useSelector((state) => state.Clients.accounts);
  const formik = useFormik({ initialValues: { operatorAssigned: '', accountId: '' }, onSubmit: (values) => dispatch(reassignOrderInit(values, details.id, onShowForm)) });

  useEffect(() => {
    dispatch(getOperatorsInit());
    dispatch(getClientAccounts(userId));
  }, [dispatch, userId]);

  const operatorOptions = operators.map((operator) => ({ label: `${operator.name} - ${operator.email}`, value: operator.userId }));
  const clientAccountOptions = clientAccounts.map((clientAccount) => ({
    label: `${clientAccount.account_number} - ${clientAccount.currency.ISO === 'PEN' ? 'S/.' : '$'}`,
    image: `${process.env.PUBLIC_URL}/images/banks/${clientAccount.bank.name}.svg`,
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
            <Button type='submit' className={`btn-primary ld-ext-right ${isProcessing ? 'running' : ''}`} disabled={!formik.isValid || isProcessing}>
              <span className='ld ld-ring ld-spin' />
              Reasignar orden
            </Button>
          </form>
        )}
      </CardBody>
    </Card>
  );
};

export default React.memo(ReassignOrder);