import React from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment-timezone";

//Components
import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import Table from "../../../../components/UI/Table";

const ScheduleTable = (props) => {
  const data = {
    columns: [
      {
        field: "weekday",
        title: "Día de semana",
      },
      {
        field: "openTime",
        title: "Hora de apertura",
      },
      {
        field: "closeTime",
        title: "Hora de cierre",
      },
      {
        field: "isWorkday",
        title: "¿Es laborable?",
        render: (rowData) => <span className={`fa-lg fas ${rowData.isWorkday ? "fa-check-circle text-success" : "fa-times-circle text-danger"}`} />,
      },
    ],
    rows:
      props.data.length > 0
        ? props.data.map((schedule) => {
            return {
              id: schedule.id,
              idDayOfWeek: schedule.idDayOfWeek,
              weekday: schedule.dayOfWeekName,
              openTime: moment(schedule.startTime, "HH:mm").format("hh:mm a"),
              closeTime: moment(schedule.endTime, "HH:mm").format("hh:mm a"),
              startTime: moment(schedule.startTime, "HH:mm").format("HH:mm"),
              endTime: moment(schedule.endTime, "HH:mm").format("HH:mm"),
              isWorkday: schedule.isWorkingDay,
            };
          })
        : [],
  };

  return (
    <>
      <Breadcrumbs title="Horarios" breadcrumbItem="Horarios de plataforma" />

      <Card>
        <CardBody>
          <Table
            columns={data.columns}
            rows={data.rows}
            actions={[
              {
                icon: "edit",
                iconProps: { style: { color: "#f1b44c" } },
                tooltip: "Editar horario del día",
                onClick: (e, data) => props.edit(data),
              },
            ]}
            isLoading={props.isLoading}
            options={{ paging: false }}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(ScheduleTable);
