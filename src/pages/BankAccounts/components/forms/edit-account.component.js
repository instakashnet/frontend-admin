import React from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, Button, Spinner } from "reactstrap";
import { useFormik } from "formik";
import { editCbAccount } from "../../../../store/actions";
import Input from "../../../../components/UI/FormItems/Input";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const EditAccount = ({ onHideForm, account, isProcessing }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      accountId: account ? account.id : "",
      account_number: account ? account.accNumber : "",
      balance: account ? account.balanceNumber : "",
      cci: account ? account.cci : "",
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
