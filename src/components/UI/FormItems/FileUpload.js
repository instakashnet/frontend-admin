import React, { useState } from "react";
import { FormGroup, Label } from "reactstrap";
import { Input } from "reactstrap";

export const FileUpload = ({ name, onChange, placeholder, label, onBlur, error, touched, ...rest }) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const onFileChange = (e) => {
    if (!e.currentTarget.files[0]) return;
    setFilePreview(URL.createObjectURL(e.currentTarget.files[0]));
    setFile(e.currentTarget.files[0]);
    onChange(e.currentTarget.files[0]);
  };

  return (
    <FormGroup>
      {filePreview ? (
        <div className="flex items-center justify-center">
          <img
            width={150}
            style={{ marginBottom: 10, display: "block" }}
            src={filePreview.includes("blob") ? filePreview : `data:image/png;base64, ${filePreview}`}
            alt="preview"
          />
        </div>
      ) : null}
      <Label>{label}</Label>
      <div className="custom-file">
        <Input className="custom-file-input" id={name} type="file" onChange={onFileChange} {...rest} />
        <Label className="custom-file-label" htmlFor={name}>
          {!file ? placeholder : file.name.length > 40 ? `${file.name.substring(0, 40)}.${file.type.substring(file.type.indexOf("/") + 1, file.type.length)}` : file.name}
        </Label>
      </div>
      {error && touched && <span className="invalid-feedback">{error}</span>}
    </FormGroup>
  );
};
