import axios from "axios";
import { setAxiosInterceptor } from "./interceptors";

const BASE_URL = process.env.REACT_APP_STAGE === "prod" ? "https://api.instakash.net" : "https://api.dev.instakash.net";

const instancesURL = {
  exchange: {
    v1: `${BASE_URL}/exchange-service/api/v1/admin`,
    v2: `${BASE_URL}/exchange-service/api/v2/admin`,
  },
  auth: {
    v1: `${BASE_URL}/auth-service/api/v1/admin`,
  },
  accounts: {
    v1: `${BASE_URL}/accounts-service/api/v1/admin`,
  },
};

export const getAxiosInstance = (instanceName, version) => {
  const instance = axios.create({
    baseURL: instancesURL[instanceName][version],
    withCredentials: true,
    timeout: 30000,
  });

  setAxiosInterceptor(instance);

  return instance;
};

// const exchangeInstance = axios.create({
//   baseURL: EXCHANGE_URL,
//   withCredentials: true,
// });
// setAxiosInterceptor(exchangeInstance);

// const accountsInstance = axios.create({
//   baseURL: ACCOUNT_URL,
//   withCredentials: true,
// });
// setAxiosInterceptor(accountsInstance);
