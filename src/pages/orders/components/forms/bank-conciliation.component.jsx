import React, { useState, useCallback } from 'react'
import { Button, Spinner } from 'reactstrap'
import { useFormik } from 'formik'

// REDUX
import { uploadBankConciliation, downloadBankConciliation } from '../../../../store/actions'

// COMPONENTS
import { DateInput } from '../../../../components/UI/FormItems/date-picker.component'
import Dropzone from '../../../../components/UI/FormItems/CustomUpload'

export const BankConciliation = ({ dispatch, isProcessing }) => {
  const [uploaded, setUploaded] = useState(true),
    [conciliationDate, setConciliationDate] = useState(''),
    date = new Date(),
    formik = useFormik({
      initialValues: { conciliationFiles: [] },
      onSubmit: (values) => dispatch(uploadBankConciliation(values, setUploaded))
    })

  // HANLDERS
  const onDrop = (files) => formik.setFieldValue('conciliationFiles', files),
    onDownload = useCallback(() => dispatch(downloadBankConciliation(conciliationDate)), [conciliationDate, dispatch])

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
        <div className='flex items-center justify-center'>
          <Button type='submit' disabled={formik.values.conciliationFiles.length < 1 || isProcessing} className='btn-primary my-3'>
            {isProcessing ? <Spinner size='sm' /> : 'Subir archivos'}
          </Button>
        </div>
        <div className='flex flex-col justify-center items-center mt-1 mb-3'>
          <DateInput
            value={conciliationDate}
            name='conciliationDate'
            maxDate={date}
            onChange={(date) => setConciliationDate(date)}
            label='Fecha de conciliación'
            dateFormat='dd-MM-yyyy HH:mm'
          />
          <Button
            type='button'
            disabled={!uploaded || !conciliationDate || isProcessing}
            onClick={onDownload}
            className='btn-secondary mx-2'
          >
            {isProcessing ? <Spinner size='sm' /> : 'Conciliar bancos'}
          </Button>
        </div>
      </form>
    </>
  )
}
