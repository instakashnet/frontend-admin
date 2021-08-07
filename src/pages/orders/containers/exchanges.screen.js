import React, { useState, useEffect, useCallback } from "react";
import { Card, CardBody, Col, Row, Container, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRole } from "../../../hooks/useRole";
import { getAllOrders } from "../../../services/orders/exchanges.service";
import { exchangesColumns } from "../../../helpers/tables/columns";
import { setAlert } from "../../../store/actions";

//Components
import { CreateExcel } from "../components/forms/ create-excel.component";
import { Table } from "../../../components/UI/tables/table.component";

const PAGE_SIZE = 50;

export const ExchangesScreen = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(null);
  const [data, setData] = useState([]);
  const isProcessing = useSelector((state) => state.CurrencyExchange.isProcessing);
  const user = useSelector((state) => state.Login.user);
  const [role] = useRole(user);

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

    if (!search) interval = setInterval(getTableData, 45000);
    if (search && interval) clearInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [getTableData, search]);

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <div className="flex items-center">
              <Button onClick={() => getTableData()} className="mb-4 btn-primary">
                Actualizar operaciones
              </Button>

              {(role === "admin" || role === "officers") && (
                <Button onClick={() => setModal(true)} className="mb-4 ml-4 btn-primary">
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
          <CreateExcel dispatch={dispatch} isProcessing={isProcessing} />
        </ModalBody>
      </Modal>
    </div>
  );
};
