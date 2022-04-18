import camelize from "camelize";
import { getAxiosInstance } from "../axios";

export const getAllOrders = async (page, search) => {
  let URL = `/order?page=${page}&qty=50`;
  if (search) URL = `${URL}&search=${search.toLowerCase()}`;

  try {
    const response = await getAxiosInstance("exchange", "v2").get(URL);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.orders);
  } catch (error) {
    throw error;
  }
};

export const getAllWithdrawals = async (page, search) => {
  let URL = `/withdrawals?page=${page}&qty=50`;
  if (search) URL = `${URL}&search=${search.toLowerCase()}`;

  try {
    const response = await getAxiosInstance("exchange", "v1").get(URL);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};
