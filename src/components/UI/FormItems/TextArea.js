import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field, ErrorMessage } from "formik";

import classes from "./FormItems.module.scss";

const TextArea = (props) => {
  const { name, label, ...rest } = props;

  return (
    <FormGroup className='d-flex flex-column align-items-center'>
      <Label>{label}</Label>
      <Field id={name} name={name} as='textarea' className={classes.TextArea} {...rest} />
      <ErrorMessage name={name}>{(message) => <span className='invalid-feedback'>{message}</span>}</ErrorMessage>
    </FormGroup>
  );
};

export default TextArea;
