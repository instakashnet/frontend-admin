import React from "react";
import { Card, CardBody } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const Users = (props) => {
  console.log(props);
  const data = {
    columns: [
      {
        title: "Nombre completo",
        field: "userName",
        cellStyle: { border: "1px solid #32394e", borderLeft: "none" },
        headerStyle: { borderLeft: "none" },
      },
      {
        title: "Correo de acceso",
        field: "userEmail",
        cellStyle: { border: "1px solid #32394e" },
      },
      {
        title: "Rol de usuario",
        field: "userRole",
        cellStyle: { border: "1px solid #32394e" },
      },
      {
        title: "Documento",
        field: "document",
        cellStyle: { border: "1px solid #32394e" },
      },
    ],
    rows: [],
  };

  if (props.users.length > 0) {
    data.rows = props.users.map((user) => ({
      userId: user.id,
      userName: user.profiles[0].first_name + " " + user.profiles[0].last_name,
      userEmail: user.email,
      userRole: user.roles[0].name,
      document: user.profiles[0].document_type + " " + user.profiles[0].document_identification,
    }));
  }

  return (
    <>
      <Breadcrumbs title='Usuario Administrativos' breadcrumbItem='Usuarios Administrativos' />
      <Card>
        <CardBody>
          <Table columns={data.columns} rows={data.rows} />
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(Users);
