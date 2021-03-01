import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { useHistory } from "react-router-dom";
// import { convertHexToRGBA } from "../../helpers/functions";
import moment from "moment-timezone";
// import history from "../../helpers/history";

//Components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const Transactions = (props) => {
  const history = useHistory();

  const data = {
    columns: [
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
        render: (rowData) => <img width={25} src={`${process.env.PUBLIC_URL}/images/banks/${rowData.originBank}.svg`} alt='banco' />,
        width: 1 - 0,
      },
      {
        title: "D",
        field: "destinationBank",
        render: (rowData) => <img width={25} src={`${process.env.PUBLIC_URL}/images/banks/${rowData.destinationBank}.svg`} alt='banco' />,
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
          <Badge className='btn py-2 font-size-12 px-3' style={{ color: "#FFF", backgroundColor: rowData.statusColor }} pill>
            {rowData.statusName}
          </Badge>
        ),
      },
      {
        title: "Acción",
        field: "action",
        width: 150,
        render: (rowData) => (
          <button className='btn-rounded waves-effect waves-light btn btn-blue btn-sm font-size-13' onClick={() => history.push(`/exchange-details/${rowData.id}`)}>
            Ver detalles
          </button>
        ),
      },
    ],
    rows:
      props.orders.length > 0
        ? props.orders.map((order) => ({
            id: order.id,
            pedidoId: order.uuid,
            date: moment(order.created).format("DD/MM/YY hh:mm a"),
            user: order.firstName + " " + order.lastName,
            amountSent: ` ${order.currencySent === "PEN" ? "S/." : "$"} ${order.amountSent.toFixed(2)}`,
            amountReceived: `${order.currencyReceived === "PEN" ? "S/." : "$"} ${order.amountReceived.toFixed(2)}`,
            originBank: order.bankFromName,
            destinationBank: order.accToBankName,
            statusName: order.stateName,
            statusColor: order.stateColor,
            invoice: order.billAssigned,
          }))
        : [],
  };

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Transacciones' breadcrumbItem='Transacciones recibidas (cambios de divisa)' />

      <Card>
        <CardBody>
          <Table
            columns={data.columns}
            isLoading={props.isLoading}
            rows={data.rows}
            options={{ sorting: true, loadingType: "overlay", pageSize: 10, pageSizeOptions: [10, 25, 100] }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default React.memo(Transactions);
