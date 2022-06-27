import { es } from "date-fns/locale";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Label } from "reactstrap";

registerLocale("es", es);

export const DateInput = ({ value, label, touched, error, onChange, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <DatePicker className="form-control" selected={value} locale="es" dateFormat="dd-MM-yyyy" autoComplete="off" onChange={onChange} {...rest} />
      {touched && error && <span className="invalid-feedback">{error}</span>}
    </FormGroup>
  );
};
