import camelize from "camelize";
import { formatOrders } from "../../helpers/functions";
import { exchangeInstance } from "../../api/axios";

export const getAllOrders = ({ search, pageCount, type }) => {
  return new Promise(async (resolve, reject) => {
    let URL = `/order?page=${pageCount}&qty=50`;
    if (search) URL = `${URL}&search=${search.toLowerCase()}`;

    try {
      const res = await exchangeInstance.get(URL),
        ordersData = camelize(res.data.orders),
        orders = formatOrders(ordersData, type);

      resolve(orders);
    } catch (error) {
      reject(error);
    }
  });
};
