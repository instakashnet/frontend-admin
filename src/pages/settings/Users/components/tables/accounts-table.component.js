import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { getClientsAccounts } from "../../../../../api/services/accounts.service";
import { Table } from "../../../../../components/UI/tables/table.component";
import { usersAccountsColumns } from "../../../../../helpers/tables/columns";
import { setAlert } from "../../../../../store/actions";

const PAGE_SIZE = 50;

export const AccountsTable = ({ dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getTableData = useCallback(
    async (search = null, pageCount = 1) => {
      setIsLoading(true);

      try {
        const tableData = await getClientsAccounts(pageCount, search);

        const accounts = tableData.map((acc) => ({
          accountNumber: acc.accountNumber || acc.accountNumberCCI,
          accountType: `${acc.accountType === "checking" ? "Corriente" : "Ahorros"} - ${acc.currencySymbol}`,
          bankName: acc.bankName,
          createdAt: moment(acc.createdAt).format("DD-MM-YYYY HH:mm"),
          userName: acc.userName,
          userEmail: acc.userEmail,
        }));

        setData(accounts);
      } catch (error) {
        dispatch(setAlert("danger", "Ha ocurrido un error obteniendo la lista de cuentas. Por favor, intentelo más tarde."));
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <Table
            columns={usersAccountsColumns}
            data={data}
            title="Cuentas bancarias"
            isLoading={isLoading}
            pagination={{ pageSize: PAGE_SIZE, async: true }}
            search
            getData={getTableData}
          />
        </div>
      </CardBody>
    </Card>
  );
};
