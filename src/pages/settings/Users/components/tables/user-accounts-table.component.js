import { memo, useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
// COMPONENTS
import { Table } from "../../../../../components/UI/tables/table.component";
// HELPERS
import { userAccountsColumns } from "../../../../../helpers/tables/columns";


const PAGE_SIZE = 10;

const UserAccounts = ({ accounts, isLoading, userBankAccEdit, setUserBankAccEdit }) => {
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
            <Table title="Cuentas bancarias" data={data} columns={userAccountsColumns(setUserBankAccEdit)} isLoading={isLoading} pagination={{ pageSize: PAGE_SIZE, async: false }} backupText="No posee cuentas bancarias" borderless />
          </div>
          {userBankAccEdit.account_number && (
            <footer>
              <button type="button">Editar</button>
              <button type="button">Eliminar</button>
            </footer>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default memo(UserAccounts);