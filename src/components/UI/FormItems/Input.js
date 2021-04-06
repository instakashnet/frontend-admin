import React from "react";
import { FormGroup, Label } from "reactstrap";

const Input = ({ label, name, type, touched, error, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <input {...rest} name={name} type={type} className={`form-control ${touched && error ? "is-invalid" : ""}`} />
      {touched && error && <span className='invalid-feedback'>{error}</span>}
    </FormGroup>
  );
};

export default Input;
