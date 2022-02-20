import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment-timezone";
import { administratorsColumns } from "../../../../helpers/tables/columns";

import { Table } from "../../../../components/UI/tables/table.component";

const PAGE_SIZE = 5;

export const AdministratorsTable = ({ admins, isLoading, onSetOnline }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (admins.length > 0) {
      setData(
        admins.map((a) => ({
          id: a.id,
          name: a.name,
          email: a.email,
          openTime: moment().format("DDD-MM-YYYY hh:mm a"),
          online: a.online,
        }))
      );
    }
  }, [admins]);

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <Table
            title="Administradores activos"
            columns={administratorsColumns({ onSetOnline })}
            data={data}
            pagination={{ pageSize: PAGE_SIZE, async: false }}
            isLoading={isLoading}
          />
        </div>
      </CardBody>
    </Card>
  );
};
