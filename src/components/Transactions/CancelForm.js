import React from "react";
import { Button, Col } from "reactstrap";
import { Formik, Form } from "formik";

import TextArea from "../UI/FormItems/TextArea";

const CancelTransaction = (props) => {
  const onSubmit = (values) => props.decline(values.errorMessage);

  return (
    <Col className='col-12'>
      <Formik initialValues={{ errorMessage: "" }} onSubmit={onSubmit}>
        {({ isValid }) => (
          <Form>
            <TextArea name='errorMessage' label='¿Cual es el motivo?' rows='4' cols='70' />
            <Button color='primary' disabled={!isValid} type='submit'>
              Confirmar
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export default CancelTransaction;
