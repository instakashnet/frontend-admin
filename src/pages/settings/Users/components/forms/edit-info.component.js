import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Spinner } from "reactstrap";
// COMPONENTS
import Input from "../../../../../components/UI/FormItems/Input";
import Select from "../../../../../components/UI/FormItems/Select";
// REDUX ACTIONS
import { editClientInfoInit } from "../../../../../store/actions";

const EditUserInfo = ({ userId, details, closeModal, isProcessing }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: details.firstName || "",
      last_name: details.lastName || "",
      document_type: details.documentType || "",
      document_identification: details.documentIdentification || "",
      username: details.username || "",
      email: details.email || "",
      phone: details.phone || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editClientInfoInit(values, userId, closeModal)),
  });

  const documentOptions = [
    { label: "DNI", value: "DNI" },
    { label: "Carnet de Extranjería", value: "CE" },
    { label: "PTP", value: "PTP" },
    { label: "Pasaporte", value: "pasaporte" },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input value={formik.values.first_name} name="first_name" label="Nombre(s)" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Input value={formik.values.last_name} name="last_name" label="Apellido(s)" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Select value={formik.values.document_type} name="document_type" label="Tipo de documento" options={documentOptions} onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        <Input value={formik.values.document_identification} name="document_identification" label="Nro. de documento" type="text" onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
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
