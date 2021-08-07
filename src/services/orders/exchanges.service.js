import moment from "moment";
import camelize from "camelize";
import { exchangeInstance } from "../../helpers/AuthType/axios";
import { formatAmount } from "../../helpers/functions";

export const getAllOrders = ({ search, pageCount }) => {
  return new Promise(async (resolve, reject) => {
    let orders = [];
    let URL = `/order?page=${pageCount}&qty=50`;
    if (search) URL = `${URL}&search=${search.toLowerCase()}`;

    try {
      const res = await exchangeInstance.get(URL);
      const ordersData = camelize(res.data.orders);

      orders = ordersData.map((order) => ({
        id: order.id,
        pedidoId: order.uuid,
        date: order.completedAt ? moment(order.completedAt).format("DD/MM/YY hh:mm a") : "Sin completar",
        user: order.firstName + " " + order.lastName,
        revision: order.orderNotes,
        amountSent: order.amountSent > 0 ? `${order.currencySentSymbol} ${formatAmount(order.amountSent)}` : `${order.kashUsed} KASH`,
        amountReceived: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
        originBank: order.amountSent > 0 ? order.bankFromName : "kash",
        destinationBank: order.accToBankName,
        statusName: order.stateName,
        statusColor: order.stateColor,
        invoice: order.billAssigned,
        companyName: order.razonSocial || "",
      }));

      resolve(orders);
    } catch (error) {
      reject(error);
    }
  });
};
