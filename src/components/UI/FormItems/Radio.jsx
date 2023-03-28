import { FormGroup, Label } from "reactstrap";

const Radio = ({ name, label, value, onChange, onBlur, ...rest }) => {
  return (
    <FormGroup>
      <Label className="flex items-center self-center mx-2">
        <input type="radio" name={name} value={value} onChange={onChange} onBlur={onBlur} {...rest} />
        <span className="ml-2 text-sm cursor-pointer">{label}</span>
      </Label>
    </FormGroup>
  );
};

export default Radio;
