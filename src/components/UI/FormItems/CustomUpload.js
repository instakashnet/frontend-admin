import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, Row, Col } from "reactstrap";

const CustomUpload = ({ label, error, touched, onDrop, maxFiles }) => {
  const onDropHandler = useCallback(
    (acceptedFiles) => {
      if (maxFiles > 1) return onDrop(acceptedFiles);
      return onDrop(acceptedFiles[0]);
    },
    [maxFiles, onDrop]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: onDropHandler,
    maxFiles,
    multiple: maxFiles > 1,
  });

  const fileItem = (file) => {
    const k = 1024,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(file.size) / Math.log(k));

    const size = parseFloat((file.size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];

    return (
      <li className="pr-2 text-left" key={file.path}>
        {file.path} - {size}
      </li>
    );
  };

  return (
    <>
      <div className="dropzone">
        <div className="dz-message needsclick" {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="mb-2">
            <i className="display-4 text-muted bx bxs-cloud-upload"></i>
          </div>
          <h4>{label}</h4>
        </div>
      </div>
      <div className="dropzone-previews" id="file-previews">
        <Card className="mt-3 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
          <div className="px-2">
            <Row className="align-items-center">
              <ul>
                {acceptedFiles.map((file) => (
                  <div className="flex items-center justify-start mt-2" key={file.name}>
                    <Col className="col-auto">
                      <span className="bx bxs-file bx-md" />
                    </Col>
                    {fileItem(file)}
                  </div>
                ))}
              </ul>
            </Row>
          </div>
        </Card>
      </div>
      {error && touched && <span className="invalid-feedback">{error}</span>}
    </>
  );
};

export default React.memo(CustomUpload);
