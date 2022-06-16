import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Table } from "../../../../../components/UI/tables/table.component";
import { formatAmount } from "../../../../../helpers/functions";
import { oldExchangesColumns } from "../../../../../helpers/tables/columns";


const PAGE_SIZE = 5;

export const UserTransactions = ({ orders, isLoading, details, getTransactions }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (orders.length > 0) {
      const filteredOrders = details ? orders.filter((order) => order.id !== details.id) : orders;

      setData(
        filteredOrders.sort((a, b) => b.id - a.id).map((order) => ({
          id: order.id,
          date: moment(order.created).format("DD/MM/YYYY HH:mm a"),
          bankSent: order.bankSent,
          bankReceive: order.bankReceive,
          amountSent: `${order.currencySentSymbol} ${formatAmount(order.amountSent)}`,
          amountReceived: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
          statusName: order.estateName,
          statusColor: order.stateColor,
        }))
      );
    } else setData([]);
  }, [details, orders]);

  return (
    <>
      <Button type="button" color="primary" onClick={getTransactions} className="my-3">
        Obtener operaciones
      </Button>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Operaciones realizadas" columns={oldExchangesColumns} isLoading={isLoading} data={data} pagination={{ pageSize: PAGE_SIZE, async: false }} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};
