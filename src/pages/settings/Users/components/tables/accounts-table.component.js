import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { getClientsAccounts } from "../../../../../services/clients/accounts.service";

import Table from "../../../../../components/UI/Table";

export const AccountsTable = ({ dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      field: "accountNumber",
      title: "Nro. de cuenta",
    },
    {
      field: "accountType",
      title: "Tipo de cuenta",
    },
    {
      field: "bankName",
      title: "Banco",
      render: (rowData) => <img src={`${process.env.PUBLIC_URL}/images/banks/${rowData.bankName.toLowerCase()}.svg`} width={80} alt={rowData.bankName} />,
    },
    {
      field: "userName",
      title: "Nombre del usuario",
    },
    {
      field: "userEmail",
      title: "Correo",
    },
    {
      field: "createdAt",
      title: "Fecha de creación",
    },
  ];

  return (
    <Card>
      <CardBody>
        <Table
          columns={columns}
          rows={(query) => getClientsAccounts(query, setIsLoading, dispatch)}
          title="Cuentas bancarias"
          isLoading={isLoading}
          options={{ pageSize: 10, loadingType: "overlay", pageSizeOptions: [10, 25, 50] }}
        />
      </CardBody>
    </Card>
  );
};
