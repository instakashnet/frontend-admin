import React from "react";
import { Card, CardBody, CardTitle, Spinner, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { addBank, editBank } from "../../../../../store/actions";

import Input from "../../../../../components/UI/FormItems/Input";
import CustomSelect from "../../../../../components/UI/FormItems/CustomSelect";
import Checkbox from "../../../../../components/UI/FormItems/Checkbox";

const AddBank = ({ closeModal, bankValues, isProcessing }) => {
  const dispatch = useDispatch();

  let values = { name: "", active: false, enabled: true, countryId: 172, currencies: [] };
  if (bankValues) values = { name: bankValues.name, active: bankValues.active, countryId: 172, enabled: bankValues.enabled, currencies: bankValues.currencies.map((c) => c.id) };

  const formik = useFormik({
    initialValues: values,
    enableReinitialize: true,
    onSubmit: (values) => dispatch(bankValues ? editBank(bankValues.id, values, closeModal) : addBank(values, closeModal)),
  });
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
      <Card>
        <CardTitle>{bankValues ? "Agregar" : "Editar"} banco</CardTitle>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <Input name="name" label="Nombre del banco" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {!bankValues && (
              <>
                <CustomSelect name="countryId" label="Pais activo" value={formik.values.countryId} onChange={onCountryChange} options={countryOptions} />
                <CustomSelect name="currencies" label="Monedas activas" value={formik.values.currencies} onChange={onCurrencyChange} options={currencyOptions} isMulti />
              </>
            )}
            <Checkbox name="active" label="¿Es directo?" onChange={formik.handleChange} value={formik.values.active} />
            <div className="flex justify-center">
              <Button type="submit" disabled={isProcessing} className="btn-primary">
                {isProcessing ? <Spinner size="sm" /> : bankValues ? "Editar banco" : "Agregar banco"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default AddBank;
