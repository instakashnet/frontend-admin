import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getSchedule, editSchedule } from "../../../store/actions";

import ScheduleTable from "./components/schedule-table.component";
import EditSchedule from "./components/forms/edit-schedule.component";
import { CustomAlert } from "../../../components/UI/Alert";

export const ScheduleScreen = () => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const { isProcessing, isLoading, schedule } = useSelector((state) => state.Schedule);

  const editScheduleHandler = (values, id) => dispatch(editSchedule(values, id, setEditData));

  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col md="8">
            <ScheduleTable edit={setEditData} data={schedule} isLoading={isLoading} />
          </Col>
          <Col md="4">
            {editData && <EditSchedule data={editData} onEdit={editScheduleHandler} isProcessing={isProcessing} />}
            <CustomAlert />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
