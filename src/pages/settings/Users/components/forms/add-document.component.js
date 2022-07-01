import { useFormik } from "formik";
import { useState } from "react";
import { Button, Spinner } from "reactstrap";
// REDUX ACTIONS
import { uploadDocumentInit } from "../../../../../store/actions";
// COMPONENTS
import { FileUpload } from "../../../../../components/UI/FormItems/FileUpload";

const AddDocument = ({ dispatch, userId, type, isProcessing, closeModal }) => {
  const [percentage, setPercentage] = useState(0);

  const formik = useFormik({ initialValues: { [type]: "" }, onSubmit: (values) => dispatch(uploadDocumentInit(values, type, userId, closeModal, setPercentage)) });

  const onFileChange = (file) => formik.setFieldValue(type, file);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FileUpload
        fileType={type === "identity_photo" ? "frontal" : "trasera"}
        label={`Agregar foto ${type === "identity_photo" ? "frontal" : "trasera"}`}
        placeholder="Selecciona un archivo"
        accept="image/jpeg,image/png,application/pdf"
        name={type}
        onChange={onFileChange}
        onBlur={onFileChange}
      />
      <div className="flex justify-center">
        <Button type="submit" className="btn-primary" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Spinner size="sm" /> Cargando {percentage}%{" "}
            </>
          ) : (
            "Agregar foto"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddDocument;