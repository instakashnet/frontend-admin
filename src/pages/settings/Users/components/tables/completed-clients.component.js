import React, { useEffect, useState, useCallback } from "react";
import { CloudDownload } from "@material-ui/icons";
import { Card, CardBody, Button } from "reactstrap";
import { downloadClientsInit, setAlert } from "../../../../../store/actions";
import { getClients } from "../../../../../services/clients/clients.service";
import { clientsCompletedColumns } from "../../../../../helpers/tables/columns";

import { Table } from "../../../../../components/UI/tables/table.component";

const PAGE_SIZE = 10;

const Completed = ({ dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getTableData = useCallback(
    async (search = null, pageCount = 1) => {
      setIsLoading(true);

      try {
        const tableData = await getClients({ search, pageCount, completed: true });
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
    <>
      <div className="flex items-center">
        <Button type="button" className="btn-primary mb-3" onClick={() => dispatch(downloadClientsInit("companies"))}>
          Obtener empresas <CloudDownload fontSize="small" className="ml-2" />
        </Button>
        <Button type="button" className="btn-primary ml-3 mb-3" onClick={() => dispatch(downloadClientsInit("clients"))}>
          Obtener clientes <CloudDownload fontSize="small" className="ml-2" />
        </Button>
      </div>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table
              columns={clientsCompletedColumns}
              title="Usuarios (perfil completo)"
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
    </>
  );
};

export default Completed;
