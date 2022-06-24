import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "reactstrap";
// COMPONENTS
import Checkbox from "../../../../../components/UI/FormItems/Checkbox";
import Input from "../../../../../components/UI/FormItems/Input";
import Select from "../../../../../components/UI/FormItems/Select";
// HELPERS
import { addPersonalAccountValidation } from "../../../../../helpers/forms/validation";
// REDUX ACTIONS
import { addClientBankAccInit } from "../../../../../store/actions";

const PersonalAccount = ({ userId, banks, currencies, accountTypes, isThird, value, index, closeModal }) => {
  // VARIABLES & HOOKS
  const dispatch = useDispatch(),
    { isProcessing } = useSelector((state) => state.Clients),
    formik = useFormik({
      initialValues: {
        account_number: "",
        cci: "",
        bankId: "",
        interbank: false,
        isDirect: true,
        currencyId: "",
        alias: "",
        accType: "",
        thirdParty: isThird,
        accept: false
      },
      enableReinitialize: true,
      validationSchema: addPersonalAccountValidation,
      onSubmit: (values) => {
        let fixedValues = {
          ...values,
          bankId: +values.bankId,
          currencyId: +values.currencyId,
        };

        dispatch(addClientBankAccInit(userId, fixedValues, closeModal));
      },
    });

  // HANDLERS
  const onBankChangeHandler = (e) => {
    const { target: { value } } = e;

    formik.handleChange(e);
    formik.setFieldValue("account_number", "");
    formik.setFieldValue("cci", "");

    if (value) {
      let bank = banks.find((b) => b.value === +value);
      formik.setFieldValue("isDirect", bank.isDirect);
    }
  }

  return (
    <div role="tabpanel" hidden={value !== index} className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <Select
          name="bankId"
          label="Banco"
          value={formik.values.bankId}
          options={banks}
          onChange={onBankChangeHandler}
          error={formik.errors.bankId}
          touched={formik.touched.bankId}
          className="mb-0"
        />
        {!formik.values.isDirect ? (
          <Input
            name="cci"
            label="Número de cuenta interbancario"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cci}
            error={formik.errors.cci}
            touched={formik.touched.cci}
            placeholder="Debe ser de 20 caracteres."
          />
        ) : (
          <Input
            name="account_number"
            label="Número de cuenta"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.account_number}
            error={formik.errors.account_number}
            touched={formik.touched.account_number}
            placeholder="Debe ser entre 13 y 14 caracteres."
          />
        )}
        <Select
          name="accType"
          label="Tipo de cuenta"
          onChange={formik.handleChange}
          value={formik.values.accType}
          options={accountTypes}
          error={formik.errors.accType}
          touched={formik.touched.accType}
        />
        <Select
          name="currencyId"
          label="Moneda"
          value={formik.values.currencyId}
          onChange={formik.handleChange}
          options={currencies}
          error={formik.errors.currencyId}
          touched={formik.touched.currencyId}
        />
        <Input
          name="alias"
          label="Alias de la cuenta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.alias}
          error={formik.errors.alias}
          touched={formik.touched.alias}
          placeholder="Ej.: Nombre del usuario + banco + moneda"
        />
        <Checkbox
          name="accept"
          value={formik.values.accept}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.accept}
          label="Declaro que toda la información colocada es correcta y que esta cuenta pertenece al usuario."
        />
        <div className="flex justify-center">
          <Button className="btn-primary" type="submit" disabled={!formik.isValid || isProcessing}>
            {isProcessing ? <Spinner size="sm" /> : "Agregar cuenta bancaria"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalAccount;