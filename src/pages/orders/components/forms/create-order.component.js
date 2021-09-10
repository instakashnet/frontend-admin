import React from "react";
import { Button } from "reactstrap";
import { useFormik } from "formik";

import CustomSelect from "../../../../components/UI/FormItems/CustomSelect";
import Input from "../../../../components/UI/FormItems/Input";

export const CreateOrder = ({ isProcessing, dispatch, banks, currencies }) => {
  const { handleSubmit, handleChange, handleBlur, setFieldValue, isValid, values, errors, touched } = useFormik({ initialValues: {}, onSubmit: (values) => console.log(values) });

  const bankOptions = banks.map((bank) => ({ value: bank.id, label: bank.name.toUpperCase(), image: `${process.env.PUBLIC_URL}/images/banks/${bank.name.toLowerCase()}.svg` }));
  const currencyOptions = currencies.map((currency) => ({ label: `${currency.name} (${currency.Symbol})`, value: currency.id }));

  const onBankChange = (option) => console.log(option);
  const onCurrencyCahnge = (option) => console.log(option);

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="number" label="Monto a enviar" />
        <CustomSelect label="Moneda envio" options={currencyOptions} onChange={onCurrencyCahnge} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="number" label="Monto a recibir" />
        <CustomSelect label="Moneda recibe" options={currencyOptions} onChange={onCurrencyCahnge} />
      </div>
      <CustomSelect label="Banco origen" options={bankOptions} onChange={onBankChange} />
      <CustomSelect label="Banco destino" options={bankOptions} onChange={onBankChange} />
      <div className="flex justify-center">
        <Button className="btn-primary" disabled={!isValid || isProcessing}>
          Crear pedido
        </Button>
      </div>
    </form>
  );
};
