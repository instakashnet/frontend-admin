import { useFormik } from "formik";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, Spinner } from "reactstrap";
// REDUX ACTIONS
import { editExchange } from "../../../../store/actions";
// COMPONENTS
import Input from "../../../../components/UI/FormItems/Input";

const EditTransaction = ({ details, onShowForm, isProcessing, orderItemToEdit }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { transaction_code: details.transactionCode, rate: details.rate, amount_sent: details.amountSent },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editExchange(details.id, values, onShowForm)),
  });

  return (
    <Card>
      <CardBody>
        <h5>Editar operación</h5>
        <form onSubmit={formik.handleSubmit}>
          {orderItemToEdit === "transferNumber" ? (
            <Input
              type="text"
              label="Nro. de transferencia"
              name="transaction_code"
              value={formik.values.transaction_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.transaction_code}
              touched={formik.touched.transaction_code}
            />
          ) : orderItemToEdit === "rate" ? (
            <Input
              type="number"
              label="Tasa preferencial"
              name="rate"
              value={formik.values.rate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.rate}
              touched={formik.touched.rate}
            />
          ) : orderItemToEdit === "amountReceived" ? (
            <Input
              type="number"
              label="Monto recibido"
              name="amount_sent"
              value={formik.values.amount_sent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.amount_sent}
              touched={formik.touched.amount_sent}
            />
          ) : null}
          <div className="flex justify-center">
            <Button type="submit" disabled={!formik.isValid || isProcessing} className="btn-primary my-3">
              {isProcessing ? <Spinner size="sm" /> : "Editar operación"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default memo(EditTransaction);
