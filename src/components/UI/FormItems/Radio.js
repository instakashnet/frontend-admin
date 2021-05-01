import React from 'react';
import { FormGroup, Label } from 'reactstrap';

const Checkbox = (props) => {
  return (
    <FormGroup>
      <Label className='flex items-center self-center mx-2'>
        <input type='radio' name={props.name} value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
        <span className='ml-2 text-sm'>{props.label}</span>
      </Label>
    </FormGroup>
  );
};

export default Checkbox;
