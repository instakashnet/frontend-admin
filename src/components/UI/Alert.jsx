import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "reactstrap";

import { removeAlert } from "../../store/actions";

export const CustomAlert = ({ className }) => {
  const dispatch = useDispatch();
  const { color, msg, show } = useSelector((state) => state.Alert);

  useEffect(() => {
    let timeout;
    if (show) {
      timeout = setTimeout(() => dispatch(removeAlert()), 4000);
    } else {
      if (timeout) clearTimeout(timeout);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [show, dispatch]);

  return (
    <Alert color={color} isOpen={show} toggle={() => dispatch(removeAlert())} className={`max-w-xl ${className || ""}`}>
      {msg}
    </Alert>
  );
};
