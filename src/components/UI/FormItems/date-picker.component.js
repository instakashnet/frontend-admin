import React from "react";
import { FormGroup, Label } from "reactstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

registerLocale("es", es);

export const DateInput = ({ value, label, touched, error, onChange, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <DatePicker className="form-control" selected={value} locale="es" autoComplete="off" onChange={onChange} {...rest} />
      {touched && error && <span className="invalid-feedback">{error}</span>}
    </FormGroup>
  );
};
