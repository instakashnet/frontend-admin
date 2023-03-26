import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editCbBalance } from '../../../../store/actions';
import { Card, CardBody, Button, Spinner } from 'reactstrap';

import Input from '../../../../components/UI/FormItems/Input';
import Breadcrumbs from '../../../../components/Common/Breadcrumb';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const EditBalance = ({ onHideForm, accId, isProcessing }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');

  const onAmountHandler = (e) => setAmount(+e.target.value);

  const addBalandeHandler = (type) => {
    if (amount <= 0) return;
    dispatch(editCbBalance({ amount, type }, accId, onHideForm));
  };

  return (
    <>
      <Breadcrumbs title='Editar balance' breadcrumbItem='Editar' />
      <Card>
        <CardBody>
          <Input name='balance' label='Balance de cuenta' type='number' value={amount} onChange={onAmountHandler} />
          <div className='grid grid-cols-2'>
            <Button onClick={addBalandeHandler.bind(this, 'add')} className='mr-3' disabled={amount <= 0 || isProcessing}>
              <div className='flex items-center justify-center'>{isProcessing ? <Spinner color='light' size='sm' /> : <PlusIcon className='w-5 h-5' />}</div>
            </Button>
            <Button onClick={addBalandeHandler.bind(this, 'remove')} className='ml-3' disabled={amount <= 0 || isProcessing}>
              <div className='flex items-center justify-center'>{isProcessing ? <Spinner color='light' size='sm' /> : <MinusIcon className='w-5 h-5' />}</div>
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default EditBalance;
