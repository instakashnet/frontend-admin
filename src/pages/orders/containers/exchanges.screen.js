import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Badge, Col, Row, Container, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useRole } from "../../../hooks/useRole";
import { getAllOrders } from "../../../services/orders/exchanges.service";

//Components
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Table from "../../../components/UI/Table";
import { CreateExcel } from "../components/forms/ create-excel.component";

export const ExchangesScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tableRef = useRef();
  const [querySearch, setQuerySearch] = useState("");
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isProcessing = useSelector((state) => state.CurrencyExchange.isProcessing);
  const user = useSelector((state) => state.Login.user);

  useEffect(() => {
    let interval;
    if (querySearch.length <= 0 && tableRef.current) {
      interval = setInterval(() => tableRef.current.onQueryChange(), 45000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [querySearch]);

  const [role] = useRole(user);

  const columns = [
    {
      title: "Operación",
      field: "pedidoId",
      cellStyle: { fontWeight: "bold" },
      width: 150,
    },
    {
      title: "Fecha",
      field: "date",
    },
    {
      title: "Usuario",
      field: "user",
      render: (rowData) => <p>{rowData.companyName || rowData.user}</p>,
    },
    {
      title: "Envia",
      field: "amountSent",
      cellStyle: { fontWeight: "bold" },
    },
    {
      title: "Recibe",
      field: "amountReceived",
      cellStyle: { fontWeight: "bold" },
    },
    {
      title: "O",
      field: "originBank",
      render: (rowData) => (
        <img width={rowData.originBank === "kash" ? 40 : 80} src={`${process.env.PUBLIC_URL}/images/banks/${rowData.originBank.toLowerCase()}.svg`} alt={rowData.originBank} />
      ),
      width: 100,
    },
    {
      title: "D",
      field: "destinationBank",
      render: (rowData) => <img width={80} src={`${process.env.PUBLIC_URL}/images/banks/${rowData.destinationBank.toLowerCase()}.svg`} alt={rowData.destinationBank} />,
      width: 100,
    },
    {
      title: "F",
      field: "invoice",
      render: (rowData) => <span className={`${rowData.invoice ? "text-success" : "text-warning"}`}>{rowData.invoice ? "SI" : "NO"}</span>,
      width: 100,
    },
    {
      title: "Estado",
      field: "status",
      width: 100,
      render: (rowData) => (
        <Badge className="btn py-2 font-size-12 px-3" style={{ color: "#FFF", backgroundColor: rowData.revision ? "purple" : rowData.statusColor }} pill>
          {rowData.revision ? "EN REVISIÓN" : rowData.statusName}
        </Badge>
      ),
    },
    {
      title: "Acción",
      field: "action",
      render: (rowData) => (
        <Button className="btn-rounded btn-action" onClick={() => history.push(`/exchange-details/${rowData.id}`)}>
          Ver más
        </Button>
      ),
    },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <Breadcrumbs title="Transacciones" breadcrumbItem="Todas las operaciones" />

            <Card>
              <CardBody>
                <div className="flex items-center">
                  <Button onClick={() => tableRef.current.onQueryChange()} className="mb-4 btn-primary">
                    Actualizar operaciones
                  </Button>

                  {(role === "admin" || role === "officers") && (
                    <Button onClick={() => setModal(true)} className="mb-4 ml-4 btn-primary">
                      Descargar relación
                    </Button>
                  )}
                </div>
                <Table
                  ref={tableRef}
                  columns={columns}
                  isLoading={isLoading}
                  rows={(query) => getAllOrders(query, setIsLoading, setQuerySearch, dispatch)}
                  options={{ loadingType: "overlay", pageSize: 50, pageSizeOptions: [50, 100, 200] }}
                />
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
