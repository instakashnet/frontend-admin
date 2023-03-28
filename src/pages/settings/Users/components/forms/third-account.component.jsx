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
import { addThirdPartyAccountSchema } from "../../../../../helpers/forms/validation";
import { allowOnlyNumbers } from "../../../../../helpers/functions";
// REDUX ACTIONS
import { addClientBankAccInit } from "../../../../../store/actions";

const ThirdPartyAccount = ({ userId, banks, currencies, documents, accountTypes, value, index, closeModal }) => {
  // VARIABLES & HOOKS
  const dispatch = useDispatch(),
    { isProcessing } = useSelector((state) => state.Clients),
    formik = useFormik({
      initialValues: {
        account_number: "",
        cci: "",
        isDirect: true,
        bankId: "",
        currencyId: "",
        alias: "",
        accType: "",
        isThird: true,
        thirdPartyAccType: "natural",
        documentType: "",
        documentIdentity: "",
        job: "",
        name: "",
        razonSocial: "",
        email: "",
        accept: false,
        accept2: false,
      },
      enableReinitialize: true,
      validationSchema: addThirdPartyAccountSchema,
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
      const bank = banks.find((b) => b.value === +value);
      formik.setFieldValue("isDirect", bank.isDirect);
    }
  },

    onThirdPartyAccTypeChange = (e) => {
      formik.handleChange(e);

      const { target: { value } } = e;

      if (value === "juridica") {
        formik.setFieldValue("documentType", "RUC");
      } else formik.setFieldValue("documentType", "");
    },

    numberDocumentHandler = ({ target: { value } }) => (allowOnlyNumbers(value) ? formik.setFieldValue("documentIdentity", value) : null);

  return (
    <div hidden={value !== index} className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <FormLabel component="legend" className="mt-3 text-white">
          ¿A quién le pertenece esta cuenta?
        </FormLabel>
        <div className="flex flex-wrap items-center justify-evenly">
          <Radio
            className="cursor-pointer"
            name="thirdPartyAccType"
            value="natural"
            label="A una persona"
            onChange={onThirdPartyAccTypeChange}
            checked={formik.values.thirdPartyAccType === "natural"}
          />
          <Radio
            className="cursor-pointer"
            name="thirdPartyAccType"
            value="juridica"
            label="A una empresa"
            onChange={onThirdPartyAccTypeChange}
            checked={formik.values.thirdPartyAccType === "juridica"}
          />
        </div>
        <div className="grid grid-cols-3 w-full gap-2">
          <div>
            <Select
              name="documentType"
              label="Tipo doc."
              value={formik.values.documentType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={documents}
              error={formik.errors.documentType}
              touched={formik.touched.documentType}
              disabled={formik.values.thirdPartyAccType === "juridica"}
            />
          </div>
          <div className="col-span-2">
            <Input
              name="documentIdentity"
              type="text"
              label="Nro. de documento"
              value={formik.values.documentIdentity}
              onChange={numberDocumentHandler}
              onBlur={formik.handleBlur}
              error={formik.errors.documentIdentity}
              touched={formik.touched.documentIdentity}
            />
          </div>
        </div>
        {formik.values.thirdPartyAccType === "natural" ? (
          <Input
            type="text"
            name="name"
            label="Nombre completo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.errors.name}
            touched={formik.touched.name}
            placeholder="Ej.: John Doe"
          />
        ) : (
          <Input
            type="text"
            name="razonSocial"
            label="Razón social"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.razonSocial}
            error={formik.errors.razonSocial}
            touched={formik.touched.razonSocial}
            placeholder="Ej.: Instakash, S.A.C."
          />
        )}
        <Input
          type="email"
          name="email"
          label="Correo electrónico"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
          placeholder="Ej.: johndoe@example.com"
        />
        {formik.values.thirdPartyAccType === "natural" && (
          <Input
            type="text"
            name="job"
            label="Ocupación"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.job}
            error={formik.errors.job}
            touched={formik.touched.job}
            placeholder="Ej.: Comerciante"
          />
        )}
        <Select
          name="bankId"
          label="Banco"
          value={formik.values.bankId}
          options={banks}
          onChange={onBankChangeHandler}
          onBlur={formik.handleBlur}
          error={formik.errors.bankId}
          touched={formik.touched.bankId}
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
            placeholder="Debe ser de 20 caracteres"
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
            placeholder="Debe ser entre 13 y 14 caracteres"
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
        <Checkbox
          name="accept"
          value={formik.values.accept}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.accept}
          label="Declaro que toda la información colocada es correcta, actual y el usuario asume total responsabilidad de su veracidad."
        />
        <div className="my-3">
          <Checkbox
            name="accept2"
            value={formik.values.accept2}
            onChange={formik.handleChange}
            error={formik.errors.accept2}
            label="Declaro que el usuario cuenta con el consentimiento para el uso de los datos de la persona y/o empresa acá expuesta, en conformidad con el tratamiento de los mismos en relación a sus políticas de privacidad."
          />
        </div>
        <div className="flex justify-center">
          <Button className="btn-primary" type="submit" disabled={!formik.isValid || isProcessing}>
            {isProcessing ? <Spinner size="sm" /> : "Agregar cuenta bancaria"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ThirdPartyAccount;