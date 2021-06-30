import React from "react";
import { useFormik } from "formik";
import { Button, Spinner } from "reactstrap";
import { useDispatch } from "react-redux";
import { editProfileInit, addProfileInit } from "../../../../../store/actions";

import Input from "../../../../../components/UI/FormItems/Input";
import Select from "../../../../../components/UI/FormItems/Select";

const EditUser = ({ details, userId, closeModal, isProcessing }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      type: "natural",
      userId: +userId,
      identity_sex: details.identity_sex || "",
      profileId: details.id || "",
      first_name: details.first_name || "",
      last_name: details.last_name || "",
      document_type: details.document_type || "",
      document_identification: details.document_identification || "",
      occupation: details.occupation || "",
      profession: details.profession || "",
    },
    onSubmit: (values) => dispatch(details.id ? editProfileInit(values, closeModal) : addProfileInit(values, closeModal)),
  });

  const documentOptions = [
    { label: "DNI", value: "DNI" },
    { label: "Carnet de Extranjería", value: "CE" },
    { label: "PTP", value: "PTP" },
    { label: "Pasaporte", value: "pasaporte" },
  ];

  const sexOptions = [
    { value: "male", label: "Hombre" },
    { value: "female", label: "Mujer" },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input value={formik.values.first_name} name="first_name" label="Nombre(s)" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Input value={formik.values.last_name} name="last_name" label="Apellido(s)" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!details.id && (
          <Select values={formik.values.identity_sex} name="identity_sex" label="Sexo" options={sexOptions} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        )}
        <Select
          value={formik.values.document_type}
          name="document_type"
          label="Tipo de documento"
          options={documentOptions}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          value={formik.values.document_identification}
          name="document_identification"
          label="Nro. de documento"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {details.id && (
          <>
            <Input type="text" name="occupation" value={formik.values.occupation} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Ocupación" />
            <Input type="text" name="profession" value={formik.values.profession} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Profesión" />
            <Input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Dirección corta" />
          </>
        )}
      </div>
      <div className="flex justify-center my-6">
        <Button type="submit" className="btn-primary" disabled={isProcessing}>
          {isProcessing ? <Spinner size="sm" /> : details.id ? "Editar perfil" : "Agregar perfil"}
        </Button>
      </div>
    </form>
  );
};

export default EditUser;
