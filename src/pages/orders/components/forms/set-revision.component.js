import React from "react";
import { useFormik } from "formik";
import { Button, Card, CardBody, Spinner } from "reactstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setRevisionInit } from "../../../../store/actions";

import Textarea from "../../../../components/UI/FormItems/TextArea";

const validation = Yup.object().shape({
  note: Yup.string().required("Debes escribir una nota").max(1000, "Máximo 1000 caracteres."),
});

const Revision = ({ note, orderId, onShowForm, isProcessing }) => {
  const dispatch = useDispatch();
  const formik = useFormik({ initialValues: { note: note || "" }, validationSchema: validation, onSubmit: (values) => dispatch(setRevisionInit(values, orderId, onShowForm)) });

  const deleteNoteHandler = () => dispatch(setRevisionInit({ note: "" }, orderId, onShowForm));

  return (
    <>
      <h4 className="my-2">Nota para revisión</h4>
      <Card>
        <CardBody>
          <form onSubmit={formik.handleSubmit} className="text-center">
            <Textarea name="note" value={formik.values.note} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <div className="flex items-center justify-center mt-2">
              <Button type="submit" disabled={!formik.isValid || isProcessing} className="btn-success mr-2">
                {isProcessing ? <Spinner size="sm" /> : note ? "Editar nota" : "Agregar nota"}
              </Button>
              <Button type="button" className="btn-danger" disabled={isProcessing} onClick={deleteNoteHandler}>
                {isProcessing ? <Spinner size="sm" /> : "Eliminar nota"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(Revision);
