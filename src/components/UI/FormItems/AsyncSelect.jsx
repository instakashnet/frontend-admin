import React from 'react'
import { FormGroup, Label } from 'reactstrap'
import Select from 'react-select/async'

const styles = {
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: '.8rem',
    backgroundColor: state.isFocused ? '#32394e' : 'transparent'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#a6b0cf'
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#2e3548',
    color: '#fff'
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff'
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: '#2e3548',
    color: '#a6b0cf',
    borderColor: '#32394e'
  })
}

const AsyncSelect = ({ label, onChange, placeholder, options = [], touched, error, ...rest }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Select
        placeholder={placeholder}
        className={`${touched && error ? 'is-invalid' : ''}`}
        styles={styles}
        onChange={onChange}
        cacheOptions
        defaultOptions
        loadOptions={options}
        {...rest}
      />
      {touched && error && <span className='invalid-feedback'>{error}</span>}
    </FormGroup>
  )
}

export default AsyncSelect
