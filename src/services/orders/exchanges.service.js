import moment from "moment";
import camelize from "camelize";
import { removeAlert, setAlert } from "../../store/actions";
import { exchangeInstance } from "../../helpers/AuthType/axios";
import { formatAmount } from "../../helpers/functions";

export const getAllOrders = (query, setLoading, setSearch, dispatch) => {
  dispatch(removeAlert());

  return new Promise(async (resolve) => {
    const search = query.search;
    setSearch(search);
    let orders = [];
    let res;
    let URL = `/order?page=${query.page + 1}&qty=${query.pageSize}`;

    try {
      if (search) {
        if (search.length >= 5) {
          URL = `/order?page=${query.page + 1}&qty=70000&search=${search.toLowerCase()}`;
          res = await exchangeInstance.get(URL, { timeout: 20000 });
        }
      } else res = await exchangeInstance.get(URL);

      if (res && res.data) {
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
      }

      resolve({
        data: orders,
        page: query.page,
        totalCount: res && res.data ? res.data.count : 0,
      });
    } catch (error) {
      dispatch(setAlert("danger", "Ha ocurrido un error obteniendo las lista de ordenes. Intentalo de nuevo."));
    } finally {
      setLoading(false);
    }
  });
};
