import React from "react";
import { FormGroup, Label } from "reactstrap";
import Select, { components } from "react-select";

const { Option, SingleValue } = components;

const styles = {
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: ".9rem",
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

const ValueOption = (props) => (
  <SingleValue {...props}>
    <img style={{ width: "30px", display: "inline-block" }} src={`${process.env.PUBLIC_URL}/assets/images/flags/USDPEN.svg`} alt='flag' />
    <span className='ml-2'>{props.children}</span>
  </SingleValue>
);

// const CustomValueContainer = ({ children, ...props }) => {
//   console.log(props);

//   return (
//     <ValueContainer {...props}>
//       <Placeholder {...props} isFocused={props.isFocused}>
//         {props.selectProps.placeholder}
//       </Placeholder>
//       {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
//     </ValueContainer>
//   );
// };

const IconOption = (props) => {
  return (
    <Option {...props}>
      <img src={props.data.image} alt={props.data.label} style={{ width: "30px", display: "inline-block" }} />
      <span className='ml-2'>{props.data.label}</span>
    </Option>
  );
};

const CustomSelect = (props) => {
  return (
    <FormGroup>
      <Label>{props.label}</Label>
      <Select
        placeholder='Selecciona un par'
        onChange={props.onChange}
        styles={styles}
        value={props.options.find((option) => option.value === props.value)}
        options={props.options}
        components={{ Option: IconOption, SingleValue: ValueOption }}
      />
    </FormGroup>
  );
};

export default CustomSelect;
