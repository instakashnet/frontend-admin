import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSchedule, editSchedule } from "../../store/actions";

import ScheduleTable from "./ScheduleTable";
import EditSchedule from "./EditSchedule";

const Schedule = (props) => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const { isProcessing, isLoading, schedule } = useSelector((state) => state.Schedule);

  const editScheduleHandler = (values, id) => dispatch(editSchedule(values, id, setEditData));

  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col md='8'>
            <ScheduleTable edit={setEditData} data={schedule} isLoading={isLoading} />
          </Col>
          <Col md='4'>
            {props.error && <Alert color='danger'>{props.error}</Alert>}
            {props.success && <Alert color='success'>{props.success}</Alert>}
            {editData && <EditSchedule data={editData} onEdit={editScheduleHandler} isProcessing={isProcessing} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Schedule;
