import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CloudDownload } from "@material-ui/icons";
import { Card, CardBody, Button } from "reactstrap";
import { downloadClientsInit } from "../../../../../store/actions";
import { getClients } from "../../../../../services/clients/clients.service";

import Table from "../../../../../components/UI/Table";

const Completed = ({ dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      field: "userName",
      title: "Nombre",
    },
    {
      field: "email",
      title: "Correo",
    },
    {
      field: "document",
      title: "Documento",
    },
    {
      field: "phone",
      title: "Teléfono",
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
        <div className="flex items-center">
          <Button type="button" className="btn-primary mb-3" onClick={() => dispatch(downloadClientsInit("companies"))}>
            Obtener empresas <CloudDownload className="ml-2" />
          </Button>
          <Button type="button" className="btn-primary ml-3 mb-3" onClick={() => dispatch(downloadClientsInit("clients"))}>
            Obtener clientes <CloudDownload className="ml-2" />
          </Button>
        </div>
        <Table
          columns={columns}
          rows={(query) => getClients(query, setIsLoading, dispatch, true)}
          title="Completados"
          isLoading={isLoading}
          options={{ pageSize: 10, loadingType: "overlay", pageSizeOptions: [10, 25, 50] }}
        />
      </CardBody>
    </Card>
  );
};

export default Completed;
