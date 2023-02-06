import { useFormik } from 'formik';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FileUpload } from '../../../../../components/UI/FormItems/FileUpload';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { uploadDocumentInit } from '../../../../../store/actions';
import { useState } from 'react';
import { Spinner } from 'reactstrap';

const UserDocuments = ({ user, isProcessing }) => {
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);

  const formik = useFormik({
    initialValues: {
      front: '',
      back: '',
    },
    onSubmit: (values) => dispatch(uploadDocumentInit(values, user?.id, user?.documentType?.toLowerCase(), setPercentage)),
  });

  return (
    <Card>
      <CardBody>
        <CardTitle className='text-center'>Fotos de documento</CardTitle>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex flex-wrap items-center justify-center mt-4'>
            <FileUpload
              fileType='frontal'
              label={`Agregar foto ${user?.documentType?.toLowerCase() !== 'pasaporte' ? 'frontal' : 'pasaporte'}`}
              placeholder='Selecciona un archivo'
              accept='image/jpeg,image/png,image/jpg'
              name='front'
              onChange={(value) => formik.setFieldValue('front', value)}
              onBlur={(value) => formik.setFieldValue('front', value)}
            />

            {user?.documentType?.toLowerCase() !== 'pasaporte' && (
              <FileUpload
                fileType='trasera'
                label='Agregar foto trasera'
                placeholder='Selecciona un archivo'
                accept='image/jpeg,image/png,image/jpg'
                name='back'
                onChange={(value) => formik.setFieldValue('back', value)}
                onBlur={(value) => formik.setFieldValue('back', value)}
              />
            )}
          </div>

          <div className='w-full flex items-center justify-center mt-4'>
            <Button type='submit' color='primary' block disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Spinner size='sm' /> Cargando {percentage}%{' '}
                </>
              ) : (
                'Agregar fotos'
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default UserDocuments;
