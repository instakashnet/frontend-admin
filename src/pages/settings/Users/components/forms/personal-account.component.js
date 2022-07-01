import { FormLabel } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "reactstrap";
// COMPONENTS
import Checkbox from "../../../../../components/UI/FormItems/Checkbox";
import Input from "../../../../../components/UI/FormItems/Input";
import Radio from "../../../../../components/UI/FormItems/Radio";
import Select from "../../../../../components/UI/FormItems/Select";
// HELPERS
import { addPersonalAccountValidation } from "../../../../../helpers/forms/validation";
import { allowOnlyNumbers } from "../../../../../helpers/functions";
// REDUX ACTIONS
import { addClientBankAccInit } from "../../../../../store/actions";

const PersonalAccount = ({ userId, banks, currencies, documents, accountTypes, isThird, value, index, closeModal }) => {
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
        accept: false,
        joint: false,
        firstNameJoint: "",
        fatherSurname: "",
        motherSurname: "",
        documentTypeJoint: "",
        documentNumberJoint: "",
      },
      enableReinitialize: true,
      validationSchema: addPersonalAccountValidation,
      onSubmit: (values) => {
        let fixedValues = {
          ...values,
          bankId: +values.bankId,
          currencyId: +values.currencyId,
          joint: (values.joint === "true"),
          lastNameJoint: `${values.fatherSurname} ${values.motherSurname}`,
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
  },

    numberDocumentHandler = ({ target: { value } }) => (allowOnlyNumbers(value) ? formik.setFieldValue("documentNumberJoint", value) : null);

  return (
    <div role="tabpanel" hidden={value !== index} className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <Select
          name="bankId"
          label="Banco"
          value={formik.values.bankId}
          options={banks}
          onChange={onBankChangeHandler}
          onBlur={formik.handleBlur}
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
          onBlur={formik.handleBlur}
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
          onBlur={formik.handleBlur}
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
        <FormLabel component="legend" className="mt-4 text-white">
          ¿Es una cuenta mancomunada?
        </FormLabel>
        <div className="flex flex-wrap items-center justify-start">
          <Radio
            className="cursor-pointer"
            name="joint"
            value="false"
            label="No"
            onChange={formik.handleChange}
            checked={formik.values.joint !== "true"}
          />
          <Radio
            className="cursor-pointer"
            name="joint"
            value="true"
            label="Sí"
            onChange={formik.handleChange}
            checked={formik.values.joint === "true"}
          />
        </div>

        {formik.values.joint === "true" && (
          <fieldset className="mb-3">
            <legend className="text-sm font-medium">Registre los datos de la persona con la que el usuario comparte esta cuenta bancaria, tal y como aparece en el documento de identidad del cotitular.</legend>
            <Input
              name="firstNameJoint"
              label="Nombre(s)"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstNameJoint}
              error={formik.errors.firstNameJoint}
              touched={formik.touched.firstNameJoint}
            />
            <div className="grid grid-cols-2 w-full gap-2">
              <Input
                name="fatherSurname"
                label="Apellido paterno"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fatherSurname}
                error={formik.errors.fatherSurname}
                touched={formik.touched.fatherSurname}
              />
              <Input
                name="motherSurname"
                label="Apellido materno"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherSurname}
                error={formik.errors.motherSurname}
                touched={formik.touched.motherSurname}
              />
            </div>
            <div className="grid grid-cols-3 w-full gap-2">
              <Select
                name="documentTypeJoint"
                label="Tipo doc."
                value={formik.values.documentTypeJoint}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={documents}
                error={formik.errors.documentTypeJoint}
                touched={formik.touched.documentTypeJoint}
              />
              <div className="col-span-2">
                <Input
                  name="documentNumberJoint"
                  type="text"
                  label="Nro. de documento"
                  value={formik.values.documentNumberJoint}
                  onChange={numberDocumentHandler}
                  onBlur={formik.handleBlur}
                  error={formik.errors.documentNumberJoint}
                  touched={formik.touched.documentNumberJoint}
                />
              </div>
            </div>
          </fieldset>
        )}

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