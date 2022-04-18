import React, { useCallback, useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { getClients } from "../../../../../api/services/auth.service";
import { Table } from "../../../../../components/UI/tables/table.component";
import { clientsNotCompletedColumns } from "../../../../../helpers/tables/columns";
import { setAlert } from "../../../../../store/actions";

const PAGE_SIZE = 10;

const NotCompleted = ({ dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);

  const getTableData = useCallback(
    async (search = null, pageCount = 1) => {
      setIsLoading(true);

      try {
        const tableData = await getClients(pageCount, search, false),
          users = tableData.map((user) => ({
            id: user.id,
            userName: user.first_name + " " + user.last_name,
            email: user.email,
            document: user.document_type + " " + user.document_identification,
            phone: user.phone,
            date: user.createdAt,
            status: !!+user.active,
          }));

        setData(users);
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
