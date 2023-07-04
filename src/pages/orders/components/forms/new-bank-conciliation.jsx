import React from 'react'
import { Button, Spinner } from 'reactstrap'
import { useFormik } from 'formik'

// REDUX
import { conciliateBanks } from '../../../../store/actions'

// COMPONENTS
import { DateInput } from '../../../../components/UI/FormItems/date-picker.component'
import Dropzone from '../../../../components/UI/FormItems/CustomUpload'

const actualDate = new Date()

export const NewBankConciliation = ({ dispatch, isProcessing }) => {
  const formik = useFormik({
    initialValues: { archivos: [], fecha_inicio: '', fecha_fin: '' },
    onSubmit: (values) => dispatch(conciliateBanks(values))
  })

  // HANLDERS
  const onDrop = (files) => formik.setFieldValue('archivos', files)

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Dropzone
          error={formik.errors.file}
          touched={formik.touched.file}
          maxFiles={5}
          label='Arrastra aquí los archivos.'
          onDrop={onDrop}
        />
        <div className='flex items-center justify-center gap-x-4'>
          <DateInput
            value={formik.values.fecha_inicio}
            name='fecha'
            maxDate={actualDate}
            onChange={(date) => formik.setFieldValue('fecha_inicio', date)}
            label='Fecha desde'
            showTimeSelect
            dateFormat='dd-MM-yyyy HH:mm'
          />
          <DateInput
            value={formik.values.fecha_fin}
            name='fecha'
            maxDate={actualDate}
            showTimeSelect
            onChange={(date) => formik.setFieldValue('fecha_fin', date)}
            label='Fecha hasta'
            dateFormat='dd-MM-yyyy HH:mm'
          />
        </div>

        <div className='flex flex-col justify-center items-center mt-1 mb-3'>
          <Button type='submit' disabled={!formik.isValid || isProcessing} className='btn-secondary mx-2'>
            {isProcessing ? <Spinner size='sm' /> : 'Conciliar cuentas bancarias'}
          </Button>
        </div>
      </form>
    </>
  )
}
