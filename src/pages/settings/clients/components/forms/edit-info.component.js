import React from "react";
import { useFormik } from "formik";
import { Button, Spinner } from "reactstrap";
import { useDispatch } from "react-redux";
import { editClientInfoInit } from "../../../../../store/actions";

import Input from "../../../../../components/UI/FormItems/Input";

const EditUserInfo = ({ userId, details, closeModal, isProcessing }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { username: details.username || "", email: details.email || "", phone: details.phone || "" },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editClientInfoInit(values, userId, closeModal)),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="username" type="text" label="Código de usuario" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Input name="phone" type="text" label="Teléfono" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>
      <Input name="email" type="email" label="Correo electrónico" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      <div className="flex items-center justify-center my-4">
        <Button type="submit" className="btn-primary" disabled={isProcessing}>
          {isProcessing ? <Spinner size="sm" /> : "Editar datos"}
        </Button>
      </div>
    </form>
  );
};

export default EditUserInfo;
