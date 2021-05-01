import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCbBalance } from '../../../store/actions';
import { Card, CardBody, Button } from 'reactstrap';

import Input from '../../../components/UI/FormItems/Input';
import Breadcrumbs from '../../../components/Common/Breadcrumb';

const EditBalance = (props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');

  const { isProcessing } = useSelector((state) => state.BankAccounts);

  const onAmountHandler = (e) => setAmount(+e.target.value);

  const addBalandeHandler = (type) => {
    if (amount <= 0) return;
    dispatch(editCbBalance({ amount, type }, props.accId, props.setAddState));
  };

  return (
    <>
      <Breadcrumbs title='Editar balance' breadcrumbItem='Editar' />
      <Card>
        <CardBody>
          <Input name='balance' label='Balance de cuenta' type='number' value={amount} onChange={onAmountHandler} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <Button
              onClick={addBalandeHandler.bind(this, 'add')}
              style={{ marginRight: '50px' }}
              className={`ld-ext-right ${isProcessing ? 'running' : ''}`}
              disabled={amount <= 0 || isProcessing}>
              <div className='ld ld-ring ld-spin'></div>
              <span className='fas fa-plus' />
            </Button>
            <Button
              onClick={addBalandeHandler.bind(this, 'remove')}
              style={{ marginLeft: '50px' }}
              className={`ld-ext-right ${isProcessing ? 'running' : ''}`}
              disabled={amount <= 0 || isProcessing}>
              <div className='ld ld-ring ld-spin'></div>
              <span className='fas fa-minus' />
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default EditBalance;
