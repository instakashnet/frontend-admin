import React, { useEffect, useState, useCallback } from "react";
import { Card, CardBody } from "reactstrap";
import { setAlert } from "../../../../../store/actions";
import { getClients } from "../../../../../services/clients/clients.service";
import { clientsNotCompletedColumns } from "../../../../../helpers/tables/columns";

import { Table } from "../../../../../components/UI/tables/table.component";

const PAGE_SIZE = 10;

const NotCompleted = ({ dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);

  const getTableData = useCallback(
    async (search = null, pageCount = 1) => {
      setIsLoading(true);

      try {
        const tableData = await getClients({ search, pageCount, completed: false });
        setData(tableData);
      } catch (error) {
        console.log(error);
        dispatch(setAlert("danger", "Ha ocurrido un error obteniendo la lista de clientes. Por favor intenta de nuevo o contacta a soporte."));
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
            columns={clientsNotCompletedColumns}
            title="Usuarios (perfil incompleto)"
            isLoading={isLoading}
            data={data}
            getData={getTableData}
            search
            sorted
            pagination={{ pageSize: PAGE_SIZE, async: true }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default NotCompleted;
