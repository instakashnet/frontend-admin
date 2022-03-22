import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Spinner } from "reactstrap";

import Dropzone from "../../../../components/UI/FormItems/CustomUpload";
import Input from "../../../../components/UI/FormItems/Input";

const validateForm = Yup.object().shape({
  file: Yup.mixed().required("Debes cargar un archivo"),
  transactionCodeFinalized: Yup.string()
    .required("Debes colocar el nro. de operación.")
    .matches(/^[0-9]{6,9}$/, "Debes ingresar un nro. de operación válido."),
});

const TransferInvoice = ({ onApprove, isProcessing }) => {
  const formik = useFormik({ initialValues: { file: "", transactionCodeFinalized: "" }, validationSchema: validateForm, onSubmit: (values) => onApprove(values) });

  const fileDropHandler = (file) => formik.setFieldValue("file", file);

  return (
    <form onSubmit={formik.handleSubmit} className="text-center">
      <div className="flex justify-center w-full">
        <Input
          name="transactionCodeFinalized"
          value={formik.values.transactionCodeFinalized}
          onChange={formik.handleChange}
          error={formik.errors.transactionCodeFinalized}
          touched={formik.touched.transactionCodeFinalized}
          label="Nro. de operación"
        />
      </div>
      <Dropzone error={formik.errors.file} touched={formik.touched.file} maxFiles={1} label="Arrastra aquí el comprobante o haz click para subir." onDrop={fileDropHandler} />
      <Button type="submit" className="btn-primary my-3" disabled={!formik.isValid || isProcessing}>
        {isProcessing ? <Spinner size="sm" /> : "Aprobar operación"}
      </Button>
    </form>
  );
};

export default React.memo(TransferInvoice);
