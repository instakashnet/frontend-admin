import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Container, Row, Col, Card, CardBody, Badge } from "reactstrap";
import { useHistory } from "react-router-dom";
import { getWithdrawsInit } from "../../../store/actions";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Table from "../../../components/UI/Table";

export const WithdrawalsScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, withdrawals } = useSelector((state) => state.Withdrawals);

  useEffect(() => {
    dispatch(getWithdrawsInit());
  }, [dispatch]);

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
      title: "Recibe",
      field: "destinationBank",
      render: (rowData) => <img width={80} src={`${process.env.PUBLIC_URL}/images/banks/${rowData.destinationBank.toLowerCase()}.svg`} alt={rowData.destinationBank} />,
      width: 100,
    },
    {
      title: "Estado",
      field: "status",
      width: 100,
      render: (rowData) => (
        <Badge className="btn py-2 font-size-12 px-3" style={{ color: "#FFF", backgroundColor: rowData.statusColor }} pill>
          {rowData.statusName}
        </Badge>
      ),
    },
    {
      title: "KASH solicitados",
      field: "kashQty",
    },
    {
      title: "Acción",
      field: "action",
      width: 150,
      render: (rowData) => (
        <button className="btn-rounded waves-effect waves-light btn btn-blue btn-sm font-size-13" onClick={() => history.push(`/withdrawal-details/${rowData.id}`)}>
          Ver detalles
        </button>
      ),
    },
  ];

  let data = [];

  if (withdrawals.length > 0) {
    data = withdrawals.map((withdraw) => ({
      id: withdraw.id,
      pedidoId: withdraw.uuid,
      date: moment(withdraw.createdAt).format("DD-MM-YYYY HH:mm"),
      user: withdraw.firstName + " " + withdraw.lastName,
      destinationBank: withdraw.bankName.toLowerCase(),
      statusColor: withdraw.statusColor,
      statusName: withdraw.statusName,
      kashQty: withdraw.kashQty + " KASH = $ " + withdraw.kashQty,
    }));
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <Breadcrumbs title="Solicitudes de retiro" breadcrumbItem="Retiros recientes" />

            <Card>
              <CardBody>
                <Table columns={columns} rows={data} options={{ sorting: true, loadingType: "overlay", pageSize: 10 }} isLoading={isLoading} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
