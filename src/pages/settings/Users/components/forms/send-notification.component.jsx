import { useFormik } from "formik";
import { Button, Spinner } from "reactstrap";
import Input from "../../../../../components/UI/FormItems/Input";
import TextArea from "../../../../../components/UI/FormItems/TextArea";
import { sendNotificationValidations } from "../../../../../helpers/forms/validation";
import { sendNotificationInit } from "../../../../../store/actions";

const SendNotification = ({ dispatch, isProcessing, closeModal }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: sendNotificationValidations,
    onSubmit: (values) => dispatch(sendNotificationInit(values, closeModal)),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        value={formik.values.title}
        name="title"
        label="Título"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.title}
        error={formik.errors.title}
        maxLength="40"
      />
      <TextArea
        value={formik.values.body}
        name="body"
        label="Mensaje"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.body}
        error={formik.errors.body}
        maxLength="144"
      />
      <div className="flex justify-center my-6">
        <Button type="submit" className="btn-primary" disabled={isProcessing}>
          {isProcessing ? <Spinner size="sm" /> : "Enviar"}
        </Button>
      </div>
    </form>
  );
}

export default SendNotification;