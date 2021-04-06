import React, { useState } from "react";
import { FormGroup, Label } from "reactstrap";
import { Field, ErrorMessage } from "formik";
import { Input } from "reactstrap";

const FileUpload = (props) => {
  const [fileName, setFileName] = useState(null);

  const onFileChange = (e, setFieldValue, name) => {
    if (!e.currentTarget.files[0]) return;
    setFieldValue("imagePreview", URL.createObjectURL(e.currentTarget.files[0]));
    setFileName(e.currentTarget.files[0].name);
    setFieldValue(name, e.currentTarget.files[0]);
  };

  return (
    <FormGroup>
      {props.preview ? (
        <img
          height={30}
          style={{ marginBottom: 10, display: "block" }}
          src={props.preview.includes("blob") ? props.preview : `data:image/png;base64, ${props.preview}`}
          alt='preview'
        />
      ) : null}
      <Label>{props.label}</Label>
      <Field name={props.name}>
        {({ field, form }) => (
          <div className='custom-file'>
            <Input
              className='custom-file-input'
              id={props.name}
              type='file'
              accept='image/x-png,image/gif,image/jpeg'
              onChange={(e) => onFileChange(e, form.setFieldValue, field.name)}
            />
            <Label className='custom-file-label' htmlFor={props.name}>
              {!fileName ? props.placeholder : fileName}
            </Label>
          </div>
        )}
      </Field>
      <ErrorMessage name={props.name}>{(message) => <span className='invalid-feedback'>{message}</span>}</ErrorMessage>
    </FormGroup>
  );
};

export default FileUpload;
