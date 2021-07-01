import React from "react";
import { Card, CardBody, Spinner, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { bankValues } from "../../../../../helpers/forms/values";
import { addBank } from "../../../../../store/actions";

import Input from "../../../../../components/UI/FormItems/Input";
import CustomSelect from "../../../../../components/UI/FormItems/CustomSelect";
import Checkbox from "../../../../../components/UI/FormItems/Checkbox";
import Breadcrumbs from "../../../../../components/Common/Breadcrumb";

const AddBank = ({ setAddState, editState, isProcessing }) => {
  const dispatch = useDispatch();

  const formik = useFormik({ initialValues: bankValues, onSubmit: (values) => dispatch(addBank(values, setAddState)) });
  const { countries, currencies } = useSelector((state) => state.Data);

  const countryOptions = countries.map((country) => ({ label: country.name, value: country.id }));
  const currencyOptions = currencies.map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }));

  const onCountryChange = (option) => formik.setFieldValue("countryId", option.value);
  const onCurrencyChange = (options) => {
    if (!options) return;

    const currencies = options.map((option) => option.value);
    formik.setFieldValue("currencies", currencies);
  };

  return (
    <>
      <Breadcrumbs title="Bancos" breadcrumbItem={`${editState ? "Editar" : "Agregar"} banco`} />
      <Card>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <Input name="name" label="Nombre del banco" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <CustomSelect name="countryId" label="Pais activo" value={formik.values.countryId} onChange={onCountryChange} options={countryOptions} />
            <CustomSelect name="currencies" label="Monedas activas" value={formik.values.currencies} onChange={onCurrencyChange} options={currencyOptions} isMulti />
            <Checkbox name="active" label="¿Es directo?" onChange={formik.handleChange} value={formik.values.active} />
            <Button type="submit" disabled={isProcessing} className="btn-primary">
              {isProcessing ? <Spinner size="sm" /> : editState ? "Editar banco" : "Agregar banco"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default AddBank;
