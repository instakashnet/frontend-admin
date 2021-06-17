import moment from "moment";
import { exchangeInstance } from "../../helpers/AuthType/axios";
import { formatAmount } from "../../helpers/functions";

export const getAllOrders = (query, setLoading, setSearch) => {
  return new Promise(async (resolve) => {
    const search = query.search;
    setSearch(search);
    let orders = [];
    let res;
    let URL = `/order/admin?page=${query.page + 1}&qty=${query.pageSize}`;

    if (search) {
      if (search.length >= 5) {
        URL = `/order/admin?page=${query.page + 1}&qty=50000&search=${search}`;
        res = await exchangeInstance.get(URL);
      }
    } else res = await exchangeInstance.get(URL);

    if (res && res.data) {
      orders = res.data.orders.map((order) => ({
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
    }

    setLoading(false);
    resolve({
      data: orders,
      page: query.page,
      totalCount: res && res.data ? res.data.count : 0,
    });
  });
};
