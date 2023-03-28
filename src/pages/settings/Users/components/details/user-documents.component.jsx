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
    },
    onSubmit: (values) => dispatch(uploadDocumentInit(values, user?.id, setPercentage)),
  });

  return (
    <Card>
      <CardBody>
        <CardTitle className='text-center'>Foto del documento</CardTitle>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex flex-wrap items-center justify-center mt-4'>
            <FileUpload
              fileType='frontal'
              label={`Agregar foto del ${user?.documentType}`}
              placeholder='Selecciona un archivo'
              accept='image/jpeg,image/png,image/jpg'
              name='front'
              onChange={(value) => formik.setFieldValue('front', value)}
              onBlur={(value) => formik.setFieldValue('front', value)}
            />
          </div>

          <div className='w-full flex items-center justify-center mt-4'>
            <Button type='submit' color='primary' block disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Spinner size='sm' /> Cargando {percentage}%{' '}
                </>
              ) : (
                'Agregar foto'
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default UserDocuments;
