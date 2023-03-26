import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { statusColumns } from "../../../../helpers/tables/columns";

import { Table } from "../../../../components/UI/tables/table.component";

const StatusTable = ({ status, isLoading, onEdit }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      status.map((status) => ({
        id: status.id,
        name: status.name,
        color: status.color,
      }))
    );
  }, [status]);

  return (
    <>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Status de ordenes" columns={statusColumns({ onEdit })} data={data} isLoading={isLoading} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(StatusTable);
