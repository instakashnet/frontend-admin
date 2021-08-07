import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { userAccountsColumns } from "../../../../../helpers/tables/columns";

import { Table } from "../../../../../components/UI/tables/table.component";

const PAGE_SIZE = 10;

export const UserAccounts = ({ accounts, isLoading }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      setData(
        accounts.map((account) => ({
          bank: account.bank.name,
          currency: account.currency.Symbol,
          account_number: account.account_number || account.cci,
          account_type: account.account_type === "savings" ? "De ahorros" : "Corriente",
        }))
      );
    }
  }, [accounts]);

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <Table title="Cuentas bancarias" data={data} columns={userAccountsColumns} isLoading={isLoading} pagination={{ pageSize: PAGE_SIZE, async: false }} />
        </div>
      </CardBody>
    </Card>
  );
};
