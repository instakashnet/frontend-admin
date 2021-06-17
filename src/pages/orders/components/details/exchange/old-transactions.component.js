import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import moment from "moment-timezone";
import { formatAmount } from "../../../../../helpers/functions";

import Table from "../../../../../components/UI/Table";

const OldTransactions = (props) => {
  const data = {
    columns: [
      {
        title: "Fecha",
        field: "date",
      },
      {
        title: "Enviado",
        field: "amountSent",
        cellStyle: { fontWeight: "bold" },
        render: (rowData) => (
          <div className="d-flex align-items-center">
            <span className="mr-2">{rowData.amountSent}</span>
            <img src={`${process.env.PUBLIC_URL}/images/banks/${rowData.bankReceive}.svg`} width={20} alt="banco" />
          </div>
        ),
      },
      {
        title: "Recibibo",
        field: "amountReceived",
        cellStyle: { fontWeight: "bold" },
        render: (rowData) => (
          <div className="d-flex align-items-center">
            <span className="mr-2">{rowData.amountReceived}</span>
            <img src={`${process.env.PUBLIC_URL}/images/banks/${rowData.bankSent}.svg`} width={20} alt="banco" />
          </div>
        ),
      },
      {
        title: "Estado",
        field: "status",
        render: (rowData) => (
          <Badge className="btn py-2 font-size-12 px-3" style={{ color: "#FFF", backgroundColor: rowData.statusColor }} pill>
            {rowData.statusName}
          </Badge>
        ),
      },
    ],
    rows: [],
  };

  if (props.orders.length > 0) {
    const filteredOrders = props.orders.filter((order) => order.id !== props.details.id);

    data.rows = filteredOrders.reverse().map((order) => ({
      date: moment(order.created).format("DD/MM/YYYY HH:mm a"),
      bankSent: order.bankSent,
      bankReceive: order.bankReceive,
      amountSent: `${order.currencySentSymbol} ${formatAmount(order.amountSent)}`,
      amountReceived: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
      statusName: order.estateName,
      statusColor: order.stateColor,
    }));
  }

  return (
    <Card>
      <CardBody>
        <Table
          title="Operaciones realizadas"
          columns={data.columns}
          isLoading={props.isLoading}
          rows={data.rows}
          options={{ sorting: true, loadingType: "linear", pageSize: 5, pageSizeOptions: [5, 10, 25] }}
        />
      </CardBody>
    </Card>
  );
};

export default React.memo(OldTransactions);
