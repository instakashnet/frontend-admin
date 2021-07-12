import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Card, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const CustomUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formattedSize, setFormattedSize] = useState(null);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const onDropHandler = (file) => {
    if (file.length) {
      setFormattedSize(formatBytes(file[0].size));
      setSelectedFile(file[0]);
      props.onDrop(file[0]);
    } else return;
  };

  return (
    <>
      <Dropzone onDrop={onDropHandler} multiple={false} accept="application/pdf,image/jpg,image/jpeg,image/png">
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone">
            <div className="dz-message needsclick" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="mb-2">
                <i className="display-4 text-muted bx bxs-cloud-upload"></i>
              </div>
              <h4>{props.label}</h4>
            </div>
          </div>
        )}
      </Dropzone>
      <div className="dropzone-previews" id="file-previews">
        <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
          <div className="p-2">
            <Row className="align-items-center">
              {selectedFile && (
                <>
                  <Col className="col-auto">
                    <span className="bx bxs-file-pdf bx-md" />
                  </Col>
                  <Col>
                    <Link to="#" className="text-muted font-weight-bold">
                      {selectedFile.name}
                    </Link>
                    <p className="mb-0">
                      <strong>{formattedSize}</strong>
                    </p>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </Card>
      </div>
      {props.error && props.touched && <span className="invalid-feedback">{props.error}</span>}
    </>
  );
};

export default React.memo(CustomUpload);
