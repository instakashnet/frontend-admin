import React from "react";
import { useFormik } from "formik";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { editProfileInit } from "../../../store/actions";

import Input from "../../../components/UI/FormItems/Input";

const EditCompanyProfile = (props) => {
  const { details, isProcessing, userId } = props;

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { userId: +userId, profileId: details.id, type: "juridica", razon_social: details.razon_social, ruc: details.ruc, address: details.address },
    onSubmit: (values) => dispatch(editProfileInit(values, props.closeModal)),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input name='razon_social' label='Razón social (Nombre)' value={formik.values.razon_social} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Input name='ruc' label='RUC de la empresa' value={formik.values.ruc} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>
      <Input name='address' label='Dirección fiscal' value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} />

      <div className='flex justify-center'>
        <Button className={`btn-primary ld-ext-right ${isProcessing ? "running" : ""}`} type='submit' disabled={!formik.isValid || isProcessing}>
          <span className='ld ld-ring ld-spin' />
          Edtiar datos de empresa
        </Button>
      </div>
    </form>
  );
};

export default EditCompanyProfile;
