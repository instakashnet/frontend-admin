import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { AccountBalanceWallet } from "@material-ui/icons";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Table from "../../../components/UI/Table";

const AccountsTable = ({ accounts, isLoading, onShowForm }) => {
  const data = {
    columns: [
      {
        title: "Banco",
        field: "bankName",
        render: (rowData) => <img src={`${process.env.PUBLIC_URL}/images/banks/${rowData.bankName}.svg`} alt={rowData.bankName} className="mr-2" width={80} />,
      },
      {
        title: "Nro. de cuenta",
        field: "accNumber",
      },
      {
        title: "Cuenta Interbancaria",
        field: "cci",
      },
      {
        title: "Saldo",
        field: "balance",
      },
    ],
    rows: [],
  };

  if (accounts.length > 0) {
    data.rows = accounts.map((account) => ({
      id: account.id,
      bankName: account.bank.name,
      accNumber: account.account_number,
      cci: account.cci,
      balanceNumber: account.balance,
      balance: `${account.currency.Symbol} ${account.balance.toFixed(2)}`,
    }));
  }

  return (
    <div className="container-fluid">
      <Breadcrumbs title="Cuentas" breadcrumbItem="Cuentas bancarias de Instakash" />

      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <Table
                rows={data.rows}
                columns={data.columns}
                isLoading={isLoading}
                actions={[
                  {
                    icon: "edit",
                    iconProps: { style: { color: "#f1b44c" } },
                    tooltip: "Editar cuenta",
                    onClick: (e, rowData) => onShowForm("edit", rowData),
                  },
                  {
                    icon: () => <AccountBalanceWallet htmlColor="#f1b44c" />,
                    tooltip: "Agregar balance",
                    onClick: (e, rowData) => onShowForm("balance", rowData),
                  },
                  {
                    icon: "add",
                    iconProps: { style: { color: "#fff" } },
                    tooltip: "Agregar cuenta",
                    onClick: () => onShowForm("add"),
                    isFreeAction: true,
                  },
                ]}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(AccountsTable);
