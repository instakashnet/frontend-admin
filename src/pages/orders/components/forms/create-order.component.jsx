import { useFormik } from 'formik'
import { Button, Spinner } from 'reactstrap'
import { createBankOrder } from '../../../../store/actions'

import CustomSelect from '../../../../components/UI/FormItems/CustomSelect'
import Input from '../../../../components/UI/FormItems/Input'
import Select from '../../../../components/UI/FormItems/Select'
import { useState } from 'react'

const providersOptions = [
  { label: 'Caja Raíz', value: 'caja raiz' },
  { label: 'Caja Centro', value: 'caja centro' },
  { label: 'Mi banco', value: 'mi banco' },
  { label: 'Otros proveedores', value: 'otras' }
]

export const CreateOrder = ({ isProcessing, dispatch, accounts, currencies, getTableData, closeModal }) => {
  const [otherProvider, setOtherProvider] = useState(false)
  const formik = useFormik({
    initialValues: {
      rate: '',
      amountSend: '',
      currencySend: '',
      amountReceived: '',
      currencyReceive: '',
      accountReceive: '',
      accountSend: '',
      cashName: '',
      transactionCodeFinalized: ''
    },
    onSubmit: (values) => dispatch(createBankOrder(values, getTableData, closeModal))
  })

  const accountOptions = accounts.map((account) => ({
    value: account.id,
    label: `${account.bank.name.toUpperCase()} ${account.accountNumber} - ${account.currency.Symbol}`,
    image: `/images/banks/${account.bank.name.toLowerCase()}.svg`
  }))
  const currencyOptions = currencies.map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }))

  const onSelectChange = (option, name) => formik.setFieldValue([name], option.value)

  const onSelectChasName = (option) => {
    const { value } = option

    console.log(value)

    if (value === 'otras') {
      formik.setFieldValue('cashName', '')
      setOtherProvider(true)
    } else {
      formik.setFieldValue('cashName', value)
      setOtherProvider(false)
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input type='text' label='Tasa' value={formik.values.rate} name='rate' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <CustomSelect
          name='cashName'
          label='Caja a enviar'
          value={formik.values.cashName}
          onChange={onSelectChasName}
          options={providersOptions}
        />
      </div>
      {otherProvider && (
        <Input
          type='text'
          label='Nombre de provedor'
          value={formik.values.cashName}
          name='cashName'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
          type='number'
          label='Monto a enviar'
          value={formik.values.amountReceived}
          name='amountReceived'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <CustomSelect
          label='Moneda envio'
          name='currencyReceive'
          value={formik.values.currencyReceive}
          options={currencyOptions}
          onChange={onSelectChange}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
          type='number'
          label='Monto a recibir'
          value={formik.values.amountSend}
          name='amountSend'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <CustomSelect
          label='Moneda recibe'
          name='currencySend'
          value={formik.values.currencySend}
          options={currencyOptions}
          onChange={onSelectChange}
        />
      </div>
      <CustomSelect
        label='Cuenta que envia'
        name='accountSend'
        value={formik.values.accountSend}
        options={accountOptions}
        onChange={onSelectChange}
      />
      <CustomSelect
        label='Cuenta que recibe'
        name='accountReceive'
        value={formik.values.accountReceive}
        options={accountOptions}
        onChange={onSelectChange}
      />
      {formik.values.accountSend && formik.values.accountSend === formik.values.accountReceive && (
        <p className='text-danger text-sm'>No puedes seleccionar la misma cuenta para enviar y recibir</p>
      )}
      <Input
        type='text'
        label='No. de operación de envío'
        name='transactionCodeFinalized'
        value={formik.values.transactionCodeFinalized}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className='flex justify-center'>
        <Button type='submit' className='btn-primary' disabled={!formik.isValid || isProcessing}>
          {isProcessing ? <Spinner size='sm' /> : 'Crear pedido'}
        </Button>
      </div>
    </form>
  )
}
