import { useFormik } from "formik";
import { Button, Spinner } from "reactstrap";
// COMPONENTS
import Input from "../../../../../components/UI/FormItems/Input";
// HELPERS
import { editClientBankAccountSchema } from "../../../../../helpers/forms/validation";
// REDUX ACTIONS
import { editClientBankAccInit } from "../../../../../store/actions";

const EditBankAccount = ({ dispatch, bankAccToEdit, isProcessing, closeModal }) => {
  // VARIABLES & HOOKS
  const formik = useFormik({
    initialValues: {
      isDirect: !!bankAccToEdit.account_number,
      alias: bankAccToEdit.alias || "",
      account_number: bankAccToEdit.account_number || "",
      cci: bankAccToEdit.cci || "",
    },
    enableReinitialize: true,
    validationSchema: editClientBankAccountSchema,
    onSubmit: (values) => dispatch(editClientBankAccInit(bankAccToEdit, values, closeModal)),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        label="Alias"
        name="alias"
        value={formik.values.alias}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.alias}
        error={formik.errors.alias}
      />
      {bankAccToEdit.account_number ? (
        <Input
          label="Número de cuenta"
          name="account_number"
          value={formik.values.account_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.account_number}
          error={formik.errors.account_number}
        />
      ) : (
        <Input
          label="Número de cuenta interbancario"
          name="cci"
          value={formik.values.cci}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.cci}
          error={formik.errors.cci}
        />)}
      <div className="flex justify-center">
        <Button className="btn-primary" type="submit" disabled={!formik.isValid || isProcessing}>
          {isProcessing ? <Spinner size="sm" /> : "Editar cuenta bancaria"}
        </Button>
      </div>
    </form>
  );
}

export default EditBankAccount;