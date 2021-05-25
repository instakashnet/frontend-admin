import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Dropzone from '../../../components/UI/FormItems/CustomUpload';
import { Button } from 'reactstrap';

const validateForm = Yup.object().shape({
  file: Yup.mixed().required('Debes cargar un archivo'),
});

const TransferInvoice = (props) => {
  const formik = useFormik({ initialValues: { file: '' }, validationSchema: validateForm, onSubmit: (values) => props.onApprove(values) });

  const fileDropHandler = (file) => formik.setFieldValue('file', file);

  return (
    <form onSubmit={formik.handleSubmit} className='text-center'>
      <Dropzone error={formik.errors.file} touched={formik.touched.file} label='Arrastra aquí el comprobante o haz click para subir.' onDrop={fileDropHandler} />
      <Button type='submit' className={`btn-primary my-3 ld-ext-right ${props.isProcessing ? 'running' : ''}`} disabled={!formik.isValid || props.isProcessing}>
        <div className='ld ld-ring ld-spin' />
        Aprobar operación
      </Button>
    </form>
  );
};

export default React.memo(TransferInvoice);
