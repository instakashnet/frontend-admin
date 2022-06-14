import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import classes from './FormItems.module.scss';


const TextArea = ({ name, label, placeholder, error, touched, ...rest }) => {
  return (
    <FormGroup className='d-flex flex-column align-items-center'>
      <Label>{label}</Label>
      <textarea name={name} placeholder={placeholder} className={`${classes.TextArea} ${touched && error ? "is-invalid" : ""}`} {...rest} />
      {touched && error && <span className="invalid-feedback">{error}</span>}
    </FormGroup>
  );
};

export default TextArea;
