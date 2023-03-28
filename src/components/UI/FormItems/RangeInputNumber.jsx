import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import React from 'react';

import classes from './FormItems.module.scss';

const RangeInputNumber = (props) => {
  const { setValue, value, name } = props;

  const add = () => setValue(name, +value < 9 ? +value + 1 : 0);
  const substract = () => setValue(name, +value <= 0 ? 9 : +value - 1);

  return (
    <div className={classes.RangeInputWrapper}>
      <button type='button' onClick={add}>
        <PlusIcon className='w-5 h-5' />
      </button>
      <input type='text' name={name} value={value} disabled />
      <button type='button' onClick={substract}>
        <MinusIcon className='w-5 h-5' />
      </button>
    </div>
  );
};

export default RangeInputNumber;
