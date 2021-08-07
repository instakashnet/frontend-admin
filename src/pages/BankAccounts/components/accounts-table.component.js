import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { companyAccountsColumns } from "../../../helpers/tables/columns";

import { Table } from "../../../components/UI/tables/table.component";

const AccountsTable = ({ accounts, isLoading, onShowForm }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      setData(
        accounts.map((account) => ({
          id: account.id,
          bankName: account.bank.name,
          accNumber: account.account_number,
          cci: account.cci,
          balanceNumber: account.balance,
          balance: `${account.currency.Symbol} ${account.balance.toFixed(2)}`,
        }))
      );
    }
  }, [accounts]);

  return (
    <div className="container-fluid">
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table
                  title="Cuentas bancarias"
                  data={data}
                  columns={companyAccountsColumns(onShowForm)}
                  isLoading={isLoading}
                  // actions={[
                  //   {
                  //     icon: "edit",
                  //     iconProps: { style: { color: "#f1b44c" } },
                  //     tooltip: "Editar cuenta",
                  //     onClick: (e, rowData) => onShowForm("edit", rowData),
                  //   },
                  //   {
                  //     icon: () => <AccountBalanceWallet htmlColor="#f1b44c" />,
                  //     tooltip: "Agregar balance",
                  //     onClick: (e, rowData) => onShowForm("balance", rowData),
                  //   },
                  //   {
                  //     icon: "add",
                  //     iconProps: { style: { color: "#fff" } },
                  //     tooltip: "Agregar cuenta",
                  //     onClick: () => onShowForm("add"),
                  //     isFreeAction: true,
                  //   },
                  // ]}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(AccountsTable);
