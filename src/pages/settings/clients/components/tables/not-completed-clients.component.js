import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { getClients } from "../../../../../services/clients/clients.service";

import Table from "../../../../../components/UI/Table";

const NotCompleted = ({ dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      field: "email",
      title: "Correo",
    },
    {
      field: "phone",
      title: "Teléfono",
      render: (rowData) => <p>{rowData.phone || "Sin teléfono"}</p>,
    },
    {
      field: "date",
      title: "Fecha registrado",
    },
    {
      field: "status",
      title: "Estado",
      render: (rowData) => <span className={!rowData.status ? "text-warning" : "text-success"}>{!rowData.status ? "NO ACTIVO" : "ACTIVO"}</span>,
    },
    {
      title: "Acción",
      field: "action",
      width: 150,
      render: (rowData) => (
        <Link to={`/registered-users/${rowData.id}`} className="btn-rounded waves-effect waves-light btn btn-blue btn-sm font-size-13">
          Ver detalles
        </Link>
      ),
    },
  ];

  return (
    <Card>
      <CardBody>
        <Table
          columns={columns}
          rows={(query) => getClients(query, setIsLoading, dispatch, false)}
          isLoading={isLoading}
          options={{ pageSize: 10, pageSizeOptions: [10, 25, 50] }}
        />
      </CardBody>
    </Card>
  );
};

export default NotCompleted;
