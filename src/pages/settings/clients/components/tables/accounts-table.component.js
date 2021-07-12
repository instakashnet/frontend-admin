import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientAccounts } from "../../../../../store/actions";
import { Card, CardBody } from "reactstrap";

import Table from "../../../../../components/UI/Table";

const AccountsTable = ({ userId }) => {
  const dispatch = useDispatch();

  const { accounts, isLoading } = useSelector((state) => state.Clients);

  useEffect(() => {
    dispatch(getClientAccounts(userId));
  }, [dispatch, userId]);

  const data = {
    columns: [
      {
        field: "bank",
        title: "Banco",
        render: (rowData) => <img src={`${process.env.PUBLIC_URL}/images/banks/${rowData.bank.toLowerCase()}.svg`} width={80} alt="banco" />,
      },
      {
        field: "currency",
        title: "Moneda",
      },
      {
        field: "account_number",
        title: "Número de cuenta",
      },
      {
        field: "account_type",
        title: "Tipo de cuenta",
      },
    ],
    rows: accounts.map((account) => ({
      bank: account.bank.name,
      currency: account.currency.Symbol,
      account_number: account.account_number || account.cci,
      account_type: account.account_type === "savings" ? "De ahorros" : "Corriente",
    })),
  };

  return (
    <Card>
      <CardBody>
        <Table title="Cuentas bancarias" rows={data.rows} columns={data.columns} isLoading={isLoading} />
      </CardBody>
    </Card>
  );
};

export default React.memo(AccountsTable);
