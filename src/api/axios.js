import axios from "axios";
import { setAxiosInterceptor } from "./interceptors";

const BASE_URL = process.env.REACT_APP_STAGE === "prod" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL,
  EXCHANGE_URL = `${BASE_URL}/exchange-service/api/v1/admin`,
  AUTH_URL = `${BASE_URL}/auth-service/api/v1/admin`,
  ACCOUNT_URL = `${BASE_URL}/accounts-service/api/v1/admin`;

const authInstance = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
});
setAxiosInterceptor(authInstance);

const exchangeInstance = axios.create({
  baseURL: EXCHANGE_URL,
  withCredentials: true,
});
setAxiosInterceptor(exchangeInstance);

const accountsInstance = axios.create({
  baseURL: ACCOUNT_URL,
  withCredentials: true,
});
setAxiosInterceptor(accountsInstance);

export { 
  authInstance, 
  exchangeInstance, 
  accountsInstance 
};
