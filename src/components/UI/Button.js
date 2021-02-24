import React from "react";

const Button = (props) => {
  const { className, ...rest } = props;

  return (
    <button className={`custom-button ${className}`} {...rest}>
      {props.children}
    </button>
  );
};

export default Button;
