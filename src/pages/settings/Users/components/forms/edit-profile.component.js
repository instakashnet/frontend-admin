import { useFormik } from "formik";
import { Button, Spinner } from "reactstrap";
// COMPONENTS
import { DateInput } from "../../../../../components/UI/FormItems/date-picker.component";
import Input from "../../../../../components/UI/FormItems/Input";
import Select from "../../../../../components/UI/FormItems/Select";
// REDUX ACTIONS
import { addProfileInit, editProfileInit } from "../../../../../store/actions";

const EditUser = ({ dispatch, userId, details, closeModal, isProcessing }) => {
  // VARIABLES & HOOKS
  const formik = useFormik({
    initialValues: {
      type: "natural",
      userId: +userId,
      identity_sex: details.identitySex || "",
      profileId: details.profileId || "",
      job: details.job || "",
      profession: details.profession || "",
      address: details.address || "",
      date_birth: details?.dateBirth ? new Date(details.dateBirth) : "",
    },
    onSubmit: (values) => dispatch(details.id ? editProfileInit(values, closeModal) : addProfileInit(values, closeModal)),
  }),

    sexOptions = [
      { value: "male", label: "Hombre" },
      { value: "female", label: "Mujer" },
    ];

  // HANDLERS
  const onDateChange = (value) => formik.setFieldValue("date_birth", new Date(value));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!details.id && (
          <Select values={formik.values.identity_sex} name="identity_sex" label="Sexo" options={sexOptions} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        )}
        <Input type="text" name="job" value={formik.values.job} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Ocupación" />
        <Input type="text" name="profession" value={formik.values.profession} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Profesión" />
        <Input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Dirección corta" />
        <DateInput value={formik.values.date_birth} error={formik.errors.date_birth} onChange={onDateChange} label="Fecha de nacimiento" />
      </div>
      <div className="flex justify-center my-6">
        <Button type="submit" className="btn-primary" disabled={isProcessing}>
          {isProcessing ? <Spinner size="sm" /> : details.id ? "Editar perfil" : "Agregar perfil"}
        </Button>
      </div>
    </form>
  );
};

export default EditUser;
