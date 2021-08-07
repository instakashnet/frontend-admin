import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment-timezone";
import { formatAmount } from "../../../../../helpers/functions";
import { oldExchangesColumns } from "../../../../../helpers/tables/columns";

import { Table } from "../../../../../components/UI/tables/table.component";

const PAGE_SIZE = 5;

export const UserTransactions = ({ orders, isLoading, details }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (orders.length > 0) {
      const filteredOrders = details ? orders.filter((order) => order.id !== details.id) : orders;

      setData(
        filteredOrders.reverse().map((order) => ({
          date: moment(order.created).format("DD/MM/YYYY HH:mm a"),
          bankSent: order.bankSent,
          bankReceive: order.bankReceive,
          amountSent: `${order.currencySentSymbol} ${formatAmount(order.amountSent)}`,
          amountReceived: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
          statusName: order.estateName,
          statusColor: order.stateColor,
        }))
      );
    }
  }, [details, orders]);

  return (
    <Card>
      <CardBody>
        <Table title="Operaciones realizadas" columns={oldExchangesColumns} isLoading={isLoading} data={data} pagination={{ pageSize: PAGE_SIZE, async: false }} />
      </CardBody>
    </Card>
  );
};
