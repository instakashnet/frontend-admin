import React from "react";
import { Card, CardBody } from "reactstrap";
import { ToggleOffOutlined, ToggleOnOutlined } from "@material-ui/icons";

import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import Table from "../../../../components/UI/Table";

const BanksList = (props) => {
  const data = {
    columns: [
      {
        field: "bankName",
        title: "Banco",
        render: (rowData) => <img src={`${process.env.PUBLIC_URL}/images/banks/${rowData.bankName.toLowerCase()}.svg`} width={80} alt="banco" />,
      },
      {
        field: "country",
        title: "Pais activo",
      },
      {
        field: "currencies",
        title: "Monedas activas",
      },
      {
        field: "isDirect",
        title: "Directo",
        render: (rowData) => (rowData.isDirect ? <ToggleOnOutlined color="primary" fontSize="large" /> : <ToggleOffOutlined color="error" fontSize="large" />),
      },
    ],
    rows: [],
  };

  if (props.data.length > 0) {
    data.rows = props.data.map((bank) => ({
      id: bank.id,
      bankName: bank.name,
      country: bank.country.name,
      currencies: bank.currencies.map((currency) => currency.ISO).join(", "),
      isDirect: bank.active,
    }));
  }

  return (
    <>
      <Breadcrumbs title="Bancos" breadcrumbItem="Bancos aceptados" />
      <Card>
        <CardBody>
          <Table
            columns={data.columns}
            rows={data.rows}
            isLoading={props.isLoading}
            options={{ loadingType: "linear", paging: false }}
            actions={[
              {
                icon: "add",
                iconProps: { style: { color: "#fff" } },
                tooltip: "Agregar banco",
                onClick: () => props.onAdd(),
                isFreeAction: true,
              },
              {
                icon: "edit",
                iconProps: { style: { color: "#f1b44c" } },
                tooltip: "Editar banco",
                onClick: (e, rowData) => console.log(rowData),
              },
            ]}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default BanksList;
