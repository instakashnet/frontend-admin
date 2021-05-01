import React from "react";
import { Row, Col, Card, CardBody, Badge } from "reactstrap";
import { convertHexToRGBA } from "../../helpers/functions";
import moment from "moment-timezone";

import { authInstance as axios } from "../../helpers/AuthType/axios";

//Components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const Transactions = React.forwardRef((props, ref) => {
  const data = {
    columns: [
      {
        title: "Operación",
        field: "pedidoId",
      },
      {
        title: "Fecha",
        field: "date",
        width: 180,
      },
      {
        title: "Usuario",
        field: "user",
      },
      {
        title: "Pago",
        field: "paymentType",
        width: 170,
      },
      {
        title: "Destino",
        field: "userBankName",
        render: (rowData) => (
          <div>
            <span style={{ marginRight: "10px" }}>{rowData.userBankName}</span> <img width={20} src={`data:image/png;base64, ${rowData.userBankImg}`} alt='banco' />
          </div>
        ),
        width: 165,
      },
      {
        title: "Paga",
        field: "amountReceive",
        width: 170,
      },
      {
        title: "Recibe",
        field: "amountSend",
        width: 170,
      },
      {
        title: "Estado",
        field: "status",
        width: 100,
        cellStyle: { textAlign: "center" },
        render: (rowData) => (
          <Badge className='btn py-2 font-size-12' style={{ color: "#FFF", backgroundColor: convertHexToRGBA(rowData.statusColor, 75) }} pill>
            {rowData.status}
          </Badge>
        ),
      },
      {
        title: "F",
        field: "invoiceStatus",
        cellStyle: { textTransform: "uppercase" },
        width: 140,
        render: (rowData) => <span className={rowData.invoiceStatus ? "text-success" : "text-warning"}>{rowData.invoiceStatus ? "si" : "no"}</span>,
      },
      {
        title: "Acción",
        field: "action",
        width: 140,
        render: (rowData) => (
          <button className='btn-rounded waves-effect waves-light btn btn-blue font-size-13' onClick={props.openModal.bind(this, rowData.id)}>
            Detalles
          </button>
        ),
      },
    ],
    rows: (query) =>
      new Promise((resolve, reject) => {
        const url = `/AvanceEfectivo/ObtenerAvancesEfectivo?Pag=${query.page + 1}&Cant=${query.pageSize}&Filtro=${query.search}`;
        axios
          .get(url)
          .then((result) => {
            const data =
              result.data.avancesEfectivos.length > 0
                ? result.data.avancesEfectivos.map((advance) => ({
                    id: advance.id,
                    pedidoId: advance.operacion,
                    date: moment(advance.fecha).tz("America/Lima").format("DD/MM/YYYY hh:mm a"),
                    user: advance.cliente,
                    paymentType: advance.metodoPago.nombre,
                    paymentTypeImg: advance.metodoPago.imagen,
                    userBankName: advance.cuentaRecibe.nombre,
                    userBankImg: advance.cuentaRecibe.imagen,
                    amountReceive: advance.montoEnvia,
                    amountSend: advance.montoRecibe,
                    invoiceStatus: advance.factura,
                    status: advance.estado.estado,
                    statusColor: advance.estado.color,
                  }))
                : [];

            resolve({
              data,
              page: query.page,
              totalCount: result.data.total,
            });
          })
          .catch((error) => reject(error));
      }),
  };

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Transacciones' breadcrumbItem='Transacciones recibidas (Avances de efectivo)' />

      <Row>
        <Col className='col-12'>
          <Card>
            <CardBody>
              <Table ref={ref} columns={data.columns} rows={data.rows} options={{ sorting: true, loadingType: "linear", pageSize: 10, pageSizeOptions: [10, 25, 100] }} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Transactions;
