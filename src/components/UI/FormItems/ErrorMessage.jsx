import React from "react";
import { ErrorMessage } from "formik";

const ErrorMessageComponent = (props) => {
  return <ErrorMessage name={props.name}>{(message) => <span className='invalid-feedback'>{message}</span>}</ErrorMessage>;
};

export default ErrorMessageComponent;
