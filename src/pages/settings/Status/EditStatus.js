import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { useFormik } from 'formik';
import { statusValues } from '../../../helpers/forms/values';

import Input from '../../../components/UI/FormItems/Input';

import Breadcrumbs from '../../../components/Common/Breadcrumb';

const EditStatus = (props) => {
  const formik = useFormik({ initialValues: statusValues(props.data), onSubmit: (values) => props.edit(values, props.data.id), enableReinitialize: true });

  return (
    <>
      <Breadcrumbs title='status' breadcrumbItem='Estados transacciones' />
      <Card>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <Input name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type='text' label='Nombre del estado' />
            <Input name='color' value={formik.values.color} onChange={formik.handleChange} onBlur={formik.handleBlur} type='color' label='Color' style={{ maxWidth: 100 }} />
            <Button color='primary' type='submit' className={`ld-ext-right ${props.isProcessing ? 'running' : ''}`} disabled={!formik.isValid || props.isProcessing}>
              <div className='ld ld-ring ld-spin'></div>
              Actualizar estado
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(EditStatus);
