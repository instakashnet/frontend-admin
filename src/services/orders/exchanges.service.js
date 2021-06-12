import moment from "moment";
import { exchangeInstance } from "../../helpers/AuthType/axios";
import { formatAmount } from "../../helpers/functions";

export const getAllOrders = (query, setLoading) =>
  new Promise(async (resolve) => {
    const res = await exchangeInstance.get(`/order/admin?page=${query.page + 1}&qty=${query.search ? "10000000" : query.pageSize}&search=${query.search}`);

    const orders = res.data.orders.map((order) => ({
      id: order.id,
      pedidoId: order.uuid,
      date: moment(order.created).format("DD/MM/YY hh:mm a"),
      user: order.firstName + " " + order.lastName,
      revision: order.orderNotes,
      amountSent: order.amountSent > 0 ? `${order.currencySentSymbol} ${formatAmount(order.amountSent)}` : `${order.kashUsed} KASH`,
      amountReceived: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
      originBank: order.amountSent > 0 ? order.bankFromName : "kash",
      destinationBank: order.accToBankName,
      statusName: order.stateName,
      statusColor: order.stateColor,
      invoice: order.billAssigned,
    }));

    setLoading(false);
    resolve({
      data: orders,
      page: query.page,
      totalCount: res.data.count,
    });
  });
