import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Badge, Col, Row, Container, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllOrders } from "../../../services/orders/exchanges.service";

//Components
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Table from "../../../components/UI/Table";

export const ExchangesScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tableRef = useRef();
  const [querySearch, setQuerySearch] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval;
    if (querySearch.length <= 0) interval = setInterval(() => tableRef.current && tableRef.current.onQueryChange(), 45000);

    return () => clearInterval(interval);
  }, [querySearch]);

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
      render: (rowData) => <img width={rowData.originBank === "kash" ? 40 : 80} src={`${process.env.PUBLIC_URL}/images/banks/${rowData.originBank}.svg`} alt="banco" />,
      width: 100,
    },
    {
      title: "D",
      field: "destinationBank",
      render: (rowData) => <img width={80} src={`${process.env.PUBLIC_URL}/images/banks/${rowData.destinationBank.toLowerCase()}.svg`} alt="banco" />,
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
                <Button onClick={() => tableRef.current.onQueryChange()} className="mb-4 btn-primary">
                  Actualizar operaciones
                </Button>
                <Table
                  ref={tableRef}
                  columns={columns}
                  isLoading={isLoading}
                  rows={(query) => getAllOrders(query, setIsLoading, setQuerySearch, dispatch)}
                  options={{ sorting: true, loadingType: "overlay", pageSize: 50, pageSizeOptions: [50, 100, 200] }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
