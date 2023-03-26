import React from 'react';

const Button = ({ className, children, ...rest }) => {
  return (
    <button className={`custom-button ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
