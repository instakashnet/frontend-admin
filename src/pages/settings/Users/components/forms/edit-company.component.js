import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Spinner } from "reactstrap";
// COMPONENTS
import Input from "../../../../../components/UI/FormItems/Input";
// REDUX ACTIONS
import { editProfileInit } from "../../../../../store/actions";


const EditCompanyProfile = ({ details, isProcessing, closeModal, userId }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { userId: +userId, profileId: details.id, type: "juridica", razon_social: details.razonSocial, ruc: details.ruc, address: details.address },
    onSubmit: (values) => dispatch(editProfileInit(values, closeModal)),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="razon_social" label="Razón social (Nombre)" value={formik.values.razon_social} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Input name="ruc" label="RUC de la empresa" value={formik.values.ruc} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>
      <Input name="address" label="Dirección fiscal" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} />

      <div className="flex justify-center">
        <Button className="btn-primary" type="submit" disabled={!formik.isValid || isProcessing}>
          {isProcessing ? <Spinner size="sm" /> : "Editar datos de empresa"}
        </Button>
      </div>
    </form>
  );
};

export default EditCompanyProfile;
