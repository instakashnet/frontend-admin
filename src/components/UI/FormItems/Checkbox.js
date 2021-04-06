import React from "react";
import { FormGroup, Label } from "reactstrap";

const Checkbox = (props) => {
  return (
    <FormGroup>
      <Label className='d-flex align-items-center'>
        <input type='checkbox' name={props.name} checked={props.value} onChange={props.onChange} onBlur={props.onBlur} />
        <span className='ml-2'>{props.label}</span>
      </Label>
    </FormGroup>
  );
};

export default Checkbox;
