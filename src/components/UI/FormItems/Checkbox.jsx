import { FormGroup, Label } from "reactstrap";

const Checkbox = ({ name, label, value, onChange, onBlur, error, ...rest }) => {
  return (
    <FormGroup>
      <Label>
        <div className="flex items-center self-center mx-2">
          <input type="checkbox" name={name} checked={value} onChange={onChange} onBlur={onBlur} {...rest} />
          <span className="ml-2 text-sm">{label}</span>
        </div>
        {error && <span className="d-block invalid-feedback">{error}</span>}
      </Label>
    </FormGroup>
  );
};

export default Checkbox;
