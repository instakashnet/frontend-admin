import { FormGroup, Label } from "reactstrap";

const Select = ({ touched, error, name, label, options, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <select {...rest} name={name} className={`custom-select ${touched && error ? "is-invalid" : ""}`}>
        <option defaultValue>Selecciona una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error && <span className="invalid-feedback">{error}</span>}
    </FormGroup>
  );
};

export default Select;
