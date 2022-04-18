import camelize from "camelize";
import { getAxiosInstance } from "../axios";

export const getClients = async (page, search, completed) => {
  let URL = `/users?type=client&page=${page}&qty=50&completed=${completed}`;
  if (search) URL = `${URL}&search=${search.toLowerCase()}`;

  try {
    const response = await getAxiosInstance("auth", "v1").get(URL);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.users);
  } catch (error) {
    throw error;
  }
};
