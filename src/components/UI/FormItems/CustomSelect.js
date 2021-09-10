import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select, { components } from "react-select";

const { Option, ValueContainer, Placeholder } = components;

const styles = {
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: ".8rem",
    backgroundColor: state.isFocused ? "#32394e" : "transparent",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#a6b0cf",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#2e3548",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#2e3548",
    color: "#a6b0cf",
    borderColor: "#32394e",
  }),
  placeholder: (provided, state) => {
    const isValid = state.isFocused || state.hasValue || state.selectProps.inputValue;
    return {
      ...provided,
      display: isValid ? "none" : "inline-block",
      color: "#a6b0cf",
    };
  },
};

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
};

const IconOption = (props) => {
  return (
    <Option {...props}>
      <span className="ml-2">{props.data.label}</span>
      {props.data.image && <img src={props.data.image} alt={props.data.label} style={{ width: "50px" }} />}
    </Option>
  );
};

const CustomSelect = ({ label, touched, error, options, value, onChange, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Select
        placeholder="Seleccionar"
        className={`${touched && error ? "is-invalid" : ""}`}
        styles={styles}
        onChange={onChange}
        value={options.find((option) => option.value === value)}
        options={options}
        components={{ Option: IconOption, ValueContainer: CustomValueContainer }}
        {...rest}
      />
      {touched && error && <span className="invalid-feedback">{error}</span>}
    </FormGroup>
  );
};

export default CustomSelect;
