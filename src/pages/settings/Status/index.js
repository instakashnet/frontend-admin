import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getStatus, editStatus } from "../../../store/actions";

import StatusTable from "./StatusTable";
import EditStatus from "./EditStatus";

const Status = () => {
  const dispatch = useDispatch();

  const [editData, setEditData] = useState(null);
  const { status, isLoading, isProcessing, error, success } = useSelector((state) => state.Status);

  const editStatusHandler = (values, id) => dispatch(editStatus(values, id, setEditData));

  useEffect(() => {
    dispatch(getStatus());
  }, [dispatch]);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="6">
            <StatusTable data={status} isLoading={isLoading} setEdit={setEditData} />
          </Col>
          <Col lg="6">{editData && <EditStatus isProcessing={isProcessing} edit={editStatusHandler} data={editData} />}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Status;
