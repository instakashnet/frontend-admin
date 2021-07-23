import React from "react";
import { Button } from "reactstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { uploadDocumentInit } from "../../../../../store/actions";

import { FileUpload } from "../../../../../components/UI/FormItems/FileUpload";

export const AddDocument = ({ type, userId, closeModal, isProcessing }) => {
  const dispatch = useDispatch();

  const formik = useFormik({ initialValues: { [type]: "" }, onSubmit: (values) => dispatch(uploadDocumentInit(values, type, userId, closeModal)) });

  const onFileChange = (file) => formik.setFieldValue(type, file);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FileUpload
        label={`Agregar foto ${type === "identity_photo" ? "frontal" : "trasera"}`}
        placeholder="Selecciona un archivo"
        accept="image/jpeg,image/png,application/pdf"
        name={type}
        onChange={onFileChange}
        onBlur={onFileChange}
      />
      <div className="flex justify-center">
        <Button type="submit" className="btn-primary" disabled={isProcessing}>
          Agregar foto
        </Button>
      </div>
    </form>
  );
};
