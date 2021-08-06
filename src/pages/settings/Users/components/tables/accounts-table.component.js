import React, { useCallback, useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { setAlert } from "../../../../../store/actions";
import { getClientsAccounts } from "../../../../../services/clients/accounts.service";
import { usersAccountsColumns } from "../../../../../helpers/tables/columns";

import { Table } from "../../../../../components/UI/tables/table.component";

const PAGE_SIZE = 50;

export const AccountsTable = ({ dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getTableData = useCallback(
    async (search = null, pageCount = 1) => {
      setIsLoading(true);

      try {
        const tableData = await getClientsAccounts({ search, pageCount });
        setData(tableData);
      } catch (error) {
        console.log(error);
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
