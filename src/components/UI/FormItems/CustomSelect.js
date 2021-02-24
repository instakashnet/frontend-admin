import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select, { components } from "react-select";

const { Option, ValueContainer, Placeholder } = components;

const styles = {
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: ".8rem",
    backgroundColor: state.isFocused ? "#32394e" : "transparent",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#a6b0cf",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "#2e3548",
  }),
  control: (provided, state) => ({
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
      {props.data.image && <img src={props.data.image} alt={props.data.label} style={{ width: "25px", marginRIght: "10px", display: "inline-block" }} />}
      <span className='ml-2'>{props.data.label}</span>
    </Option>
  );
};

const CustomSelect = (props) => {
  const { label, touched, error, options, value, onChange, ...rest } = props;

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Select
        placeholder='Seleccionar'
        className={`${touched && error ? "is-invalid" : ""}`}
        styles={styles}
        onChange={onChange}
        value={options.find((option) => option.value === value)}
        options={options}
        components={{ Option: IconOption, ValueContainer: CustomValueContainer }}
        {...rest}
      />
      {touched && error && <span className='invalid-feedback'>{props.error}</span>}
    </FormGroup>
  );
};

export default CustomSelect;
