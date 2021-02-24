import React from "react";
import { Card, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { bankValues } from "../../helpers/forms/values";
import { addBank } from "../../store/actions";

import Input from "../../components/UI/FormItems/Input";
import CustomSelect from "../../components/UI/FormItems/CustomSelect";
import Checkbox from "../../components/UI/FormItems/Checkbox";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const AddBank = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({ initialValues: bankValues, onSubmit: (values) => dispatch(addBank(values, props.setAddState)) });
  const { countries, currencies } = useSelector((state) => state.Data);
  const { isProcessing } = useSelector((state) => state.Banks);

  const countryOptions = countries.map((country) => ({ label: country.name, value: country.id }));
  const currencyOptions = currencies.map((currency) => ({ label: `${currency.name} (${currency.ISO})`, value: currency.id }));

  const onCountryChange = (option) => formik.setFieldValue("countryId", option.value);
  const onCurrencyChange = (options) => {
    if (!options) return;

    const currencies = options.map((option) => option.value);
    formik.setFieldValue("currencies", currencies);
  };

  return (
    <>
      <Breadcrumbs title='Bancos' breadcrumbItem={`${props.editState ? "Editar" : "Agregar"} banco`} />
      <Card>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <Input name='name' label='Nombre del banco' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <CustomSelect name='countryId' label='Pais activo' value={formik.values.countryId} onChange={onCountryChange} options={countryOptions} />
            <CustomSelect name='currencies' label='Monedas activas' value={formik.values.currencies} onChange={onCurrencyChange} options={currencyOptions} isMulti />
            <Checkbox name='active' label='¿Es directo?' onChange={formik.handleChange} value={formik.values.active} />
            <button type='submit' disabled={isProcessing} className={`btn btn-primary ld-ext-right ${isProcessing && "running"}`}>
              <div className='ld ld-ring ld-spin'></div>
              Agregar banco
            </button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default AddBank;
