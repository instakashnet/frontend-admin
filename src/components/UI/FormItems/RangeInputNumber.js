import React from "react";

import classes from "./FormItems.module.scss";

const RangeInputNumber = (props) => {
  const { setValue, value, name } = props;

  const add = () => setValue(name, +value < 9 ? +value + 1 : 0);
  const substract = () => setValue(name, +value <= 0 ? 9 : +value - 1);

  return (
    <div className={classes.RangeInputWrapper}>
      <button type='button' onClick={add}>
        <span className='fas fa-plus' />
      </button>
      <input type='text' name={name} value={value} disabled />
      <button type='button' onClick={substract}>
        <span className='fas fa-minus' />
      </button>
    </div>
  );
};

export default RangeInputNumber;
