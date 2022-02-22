import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment-timezone";
import { operatorsColumns } from "../../../../helpers/tables/columns";

import { Table } from "../../../../components/UI/tables/table.component";

const PAGE_SIZE = 5;

export const OperatorsTable = ({ operators, isLoading, onSetOnline }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (operators?.length > 0) {
      setData(
        operators.map((o) => ({
          id: o.userId,
          name: o.name,
          email: o.email,
          createdAt: moment(o.createdAt).format("DD-MM-YYYY"),
          online: o.online,
          bankName: o.bankName,
        }))
      );
    }
  }, [operators]);

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <Table title="Administradores activos" columns={operatorsColumns({ onSetOnline })} data={data} pagination={{ pageSize: PAGE_SIZE, async: false }} isLoading={isLoading} />
        </div>
      </CardBody>
    </Card>
  );
};
