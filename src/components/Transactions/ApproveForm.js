import React from "react";
import { Col, Button } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomUpload from "../UI/FormItems/CustomUpload";

const validationSchema = Yup.object().shape({
  invoices: Yup.array().required("Debes agregar al menos un comprobante."),
});

const ApproveForm = (props) => {
  const onSubmit = (values) => props.approve(values.invoices[0]);

  return (
    <Col className='col-12 mt-3 d-flex flex-column justify-content-center align-items-center'>
      <Formik initialValues={{ invoices: "" }} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isValid }) => (
          <Form>
            <CustomUpload name='invoices' label='Arrastra aquí el comprobante o haz click para subir.' />
            <div className='text-center mt-4'>
              <Button type='submit' disabled={!isValid} color='primary'>
                Aprobar transacción
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export default ApproveForm;
