import React, { useState } from "react";
import { Alert } from "reactstrap";

const CustomAlert = ({ color, error }) => {
  const [visible, setVisible] = useState(true);

  const closeHandler = () => setVisible(false);

  return (
    <Alert color={color} isOpen={visible} toggle={closeHandler} className='custom-alert'>
      {error}
    </Alert>
  );
};

export default CustomAlert;
