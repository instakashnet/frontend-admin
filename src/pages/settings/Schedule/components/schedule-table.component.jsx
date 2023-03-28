import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment-timezone";
import { scheduleColumns } from "../../../../helpers/tables/columns";

import { Table } from "../../../../components/UI/tables/table.component";

const ScheduleTable = ({ schedule, isLoading, onEdit }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (schedule.length > 0) {
      setData(
        schedule.map((sch) => ({
          id: sch.id,
          idDayOfWeek: sch.idDayOfWeek,
          weekday: sch.dayOfWeekName,
          openTime: moment(sch.startTime, "HH:mm").format("hh:mm a"),
          closeTime: moment(sch.endTime, "HH:mm").format("hh:mm a"),
          startTime: moment(sch.startTime, "HH:mm").format("HH:mm"),
          endTime: moment(sch.endTime, "HH:mm").format("HH:mm"),
          isWorkday: sch.isWorkingDay,
        }))
      );
    }
  }, [schedule]);

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <Table title="Horarios de atención" columns={scheduleColumns({ onEdit })} data={data} isLoading={isLoading} />
        </div>
      </CardBody>
    </Card>
  );
};

export default React.memo(ScheduleTable);
