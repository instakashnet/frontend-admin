import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, Spinner } from "reactstrap";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import Input from "../../../../components/UI/FormItems/Input";
import { editCbAccount } from "../../../../store/actions";

const EditAccount = ({ onHideForm, account, isProcessing }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      accountId: account && account.id ? account.id : "",
      account_number: account && account.accNumber ? account.accNumber : "",
      balance: account && account.balanceNumber ? account.balanceNumber : "",
      cci: account && account.cci ? account.cci : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => dispatch(editCbAccount(values, onHideForm)),
  });

  return (
    <div className="container-fluid">
      <Breadcrumbs title="Cuentas" breadcrumbItem="Editar cuenta" />
      <Card>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <Input
              name="account_number"
              label="Cuenta bancaria"
              type="text"
              value={formik.values.account_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.account_number}
              touched={formik.touched.account_number}
            />
            <Input
              name="cci"
              label="Cuenta interbancaria"
              type="text"
              value={formik.values.cci}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.cci}
              touched={formik.touched.cci}
            />
            <Input name="balance" type="number" value={formik.values.balance} onChange={formik.handleChange} onBlur={formik.handleBlur} />

            <Button className="btn-primary" disabled={isProcessing} type="submit">
              {isProcessing ? <Spinner color="light" size="sm" /> : "Editar cuenta"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default React.memo(EditAccount);
