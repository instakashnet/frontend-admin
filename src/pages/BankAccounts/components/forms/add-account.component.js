import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Button, Spinner } from "reactstrap";
import { useFormik } from "formik";
import { CbAccountValues } from "../../../../helpers/forms/values";
import { validateCbAccountValues } from "../../../../helpers/forms/validation";
import { addCbAccount } from "../../../../store/actions";

import Input from "../../../../components/UI/FormItems/Input";
import CustomSelect from "../../../../components/UI/FormItems/CustomSelect";
import Select from "../../../../components/UI/FormItems/Select";
import Breadcrumbs from "../../../../components/Common/Breadcrumb";

const AddAccounts = ({ onHideForm, isProcessing }) => {
  const dispatch = useDispatch();

  const formik = useFormik({ initialValues: CbAccountValues, validationSchema: validateCbAccountValues, onSubmit: (values) => dispatch(addCbAccount(values, onHideForm)) });
  const banks = useSelector((state) => state.Banks.banks);
  const currencies = useSelector((state) => state.Data.currencies);

  const banksOptions = banks.map((bank) => ({ value: bank.id, label: bank.name, image: `${process.env.PUBLIC_URL}/images/banks/${bank.name.toLowerCase()}.svg` }));
  const currencyOptions = currencies.map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }));

  const onBankChange = (option) => formik.setFieldValue("bankId", option.value ? option.value : "");

  return (
    <div className="container-fluid">
      <Breadcrumbs title="Cuentas" breadcrumbItem="Agregar cuenta" />
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
            <CustomSelect label="Banco" options={banksOptions} value={formik.values.bankId} error={formik.errors.bankId} touched={formik.touched.bankId} onChange={onBankChange} />
            <Select label="Moneda" name="currencyId" onChange={formik.handleChange} options={currencyOptions} />

            <Button className="btn-primary" type="submit">
              {isProcessing ? <Spinner color="light" size="sm" /> : "Agregar cuenta"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default React.memo(AddAccounts);
