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

export const getTotalKashSvc = async () => {
  try {
    const response = await getAxiosInstance("accounts", "v1").get("/accounts/users/kash-total");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.totalKashAcumulated);
  } catch (error) {
    throw error;
  }
};

export const getCbAccountsSvc = async () => {
  try {
    const response = await getAxiosInstance("accounts", "v1").get("/accounts?type=company");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getBanksSvc = async () => {
  try {
    const response = await getAxiosInstance("accounts", "v1").get("/banks");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.banks;
  } catch (error) {
    throw error;
  }
};

export const getClientAccountsSvc = async (id) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").get(`/accounts/${id}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.accounts);
  } catch (error) {
    throw error;
  }
};

export const getCountriesSvc = async () => {
  try {
    const response = await getAxiosInstance("accounts", "v1").get("/countries");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.countries);
  } catch (error) {
    throw error;
  }
};

export const getCurrenciesSvc = async () => {
  try {
    const response = await getAxiosInstance("accounts", "v1").get("/currencies");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.currencies);
  } catch (error) {
    throw error;
  }
};

// ADD AN ACCOUNT TO THE COMPANY
export const addAcbAccountSvc = async (accValues) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").post("/accounts", accValues);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const addBankSvc = async (values) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").post("/banks", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const addClientBankAccSvc = async (userId, values) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").post(`/accounts/account/${userId}`, values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const editClientBankAccSvc = async (accountId, values) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").put(`/accounts/account/${accountId}`, values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

// EDIT A COMPANY ACCOUNT
export const editCbAccountSvc = async (values) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").put("/accounts", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const editBankSvc = async (id, values) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").put(`/banks/${id}`, values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const toggleBankSvc = async (id, enabled) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").put(`enabled-banks/${id}`, { enabled });
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const editInterplazaSvc = async (values) => {
  const { accountId, interbank } = values;
  try {
    const response = await getAxiosInstance("accounts", "v1").put(`/accounts/${accountId}`, { interbank });
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const editCbBalanceSvc = async (values, accountId) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").put(`/accounts/funds/${accountId}`, values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const deleteClientBankAccSvc = async (accountId) => {
  try {
    const response = await getAxiosInstance("accounts", "v1").delete(`/accounts/account/${accountId}`, { data: { enabled: false } });
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};
