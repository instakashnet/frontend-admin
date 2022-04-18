import camelize from "camelize";
import { getAxiosInstance } from "../axios";

export const getClientsAccounts = async (count, search) => {
  let URL = `/accounts/type/users?page=${count}&qty=50`;
  if (search) URL = `${URL}&search=${search}`;

  try {
    const response = await getAxiosInstance("accounts", "v1").get(URL);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.accounts);
  } catch (error) {
    throw error;
  }
};
