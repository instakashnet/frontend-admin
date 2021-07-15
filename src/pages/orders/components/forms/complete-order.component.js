import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Spinner } from "reactstrap";

import Dropzone from "../../../../components/UI/FormItems/CustomUpload";

const validateForm = Yup.object().shape({
  file: Yup.mixed().required("Debes cargar un archivo"),
});

const TransferInvoice = ({ onApprove, isProcessing }) => {
  const formik = useFormik({ initialValues: { file: "" }, validationSchema: validateForm, onSubmit: (values) => onApprove(values) });

  const fileDropHandler = (file) => formik.setFieldValue("file", file);

  return (
    <form onSubmit={formik.handleSubmit} className="text-center">
      <Dropzone error={formik.errors.file} touched={formik.touched.file} label="Arrastra aquí el comprobante o haz click para subir." onDrop={fileDropHandler} />
      <Button type="submit" className="btn-primary my-3" disabled={!formik.isValid || isProcessing}>
        {isProcessing ? <Spinner size="sm" /> : "Aprobar operación"}
      </Button>
    </form>
  );
};

export default React.memo(TransferInvoice);
