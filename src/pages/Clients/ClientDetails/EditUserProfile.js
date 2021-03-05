import React from "react";
import { useFormik } from "formik";
import { Button } from "reactstrap";
// import { editClientValues } from "../../../helpers/forms/values";

import Input from "../../../components/UI/FormItems/Input";
import Select from "../../../components/UI/FormItems/Select";

const EditUser = (props) => {
  const { profileDetails } = props;

  const formik = useFormik({
    initialValues: { first_name: "", last_name: "", document_type: "", document_identification: "", date_birth: "", address: "", job: "", profession: "" },
    onSubmit: (values) => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input name='first_name' label='Nombre(s)' type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} />
      <Input name='last_name' label='Apellido(s)' type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} />
    </form>
  );
};

export default EditUser;
