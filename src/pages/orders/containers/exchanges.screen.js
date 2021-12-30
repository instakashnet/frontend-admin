import React, { useState, useEffect, useCallback } from "react";
import { Card, CardBody, Col, Row, Container, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRole } from "../../../hooks/useRole";
import { getAllOrders } from "../../../services/orders/exchanges.service";
import { exchangesColumns } from "../../../helpers/tables/columns";
import { setAlert } from "../../../store/actions";

//Components
import { CreateExcel } from "../components/forms/create-excel.component";
import { Table } from "../../../components/UI/tables/table.component";

const PAGE_SIZE = 50;

export const ExchangesScreen = () => {
  const dispatch = useDispatch(),
    [modal, setModal] = useState(false),
    [isLoading, setIsLoading] = useState(true),
    [search, setSearch] = useState(null),
    [excelType, setExcelType] = useState(""),
    [data, setData] = useState([]),
    isProcessing = useSelector((state) => state.CurrencyExchange.isProcessing),
    user = useSelector((state) => state.Login.user),
    [role] = useRole(user);

  const getTableData = useCallback(
    async (_, pageCount = 1) => {
      setIsLoading(true);

      try {
        const tableData = await getAllOrders({ search, pageCount });
        setData(tableData);
      } catch (error) {
        console.log(error);
        dispatch(setAlert("danger", "Ha ocurrido un error obteniendo la lista de ordenes. Por favor intenta de nuevo o contacta a soporte."));
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, search]
  );

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  useEffect(() => {
    let interval;

    if (!search) interval = setInterval(getTableData, 60000);
    if (search && interval) clearInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [getTableData, search]);

  const onCreateExcel = (type) => {
    setExcelType(type);
    setModal(true);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <div className="flex items-center">
              {/* <Button onClick={() => getTableData()} className="mb-4 btn-primary" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" /> : "Actualizar operaciones"}
              </Button> */}

              {(role === "admin" || role === "officers") && (
                <Button onClick={() => onCreateExcel("data")} className="mb-4 ml-4 btn-primary">
                  Descargar relación
                </Button>
              )}
            </div>

            <Card>
              <CardBody>
                <div className="table-responsive">
                  <Table
                    title="Ordenes recibidas"
                    columns={exchangesColumns}
                    data={data}
                    isLoading={isLoading}
                    getData={getTableData}
                    search
                    setSearch={setSearch}
                    pagination={{ pageSize: PAGE_SIZE, async: true }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} role="dialog" autoFocus centered tabIndex="-1" toggle={() => setModal((prev) => !prev)}>
        <ModalHeader>Descargar Relación</ModalHeader>
        <ModalBody>
          <CreateExcel dispatch={dispatch} isProcessing={isProcessing} excelType={excelType} />
        </ModalBody>
      </Modal>
    </div>
  );
};
