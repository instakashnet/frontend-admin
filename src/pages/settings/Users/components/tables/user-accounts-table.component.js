import React, { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { Table } from "../../../../../components/UI/tables/table.component";
import { userAccountsColumns } from "../../../../../helpers/tables/columns";


const PAGE_SIZE = 10;

export const UserAccounts = ({ accounts, isLoading }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      setData(
        accounts.map((account) => ({
          account_number: account.accountNumber || account.cci,
          balance: account.balance,
          bank: account.bank.name,
          currency: account.currency.Symbol,
        }))
      );
    }
  }, [accounts]);

  return (
    <Col lg="6">
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Cuentas bancarias" data={data} columns={userAccountsColumns} isLoading={isLoading} pagination={{ pageSize: PAGE_SIZE, async: false }} borderless />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};
