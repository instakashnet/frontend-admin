import axios from "axios";
import { getCodeMessage } from "./error-codes";

const requestLog = (config) => (process.env.NODE_ENV !== "production" ? console.log(`Request sent to ${config.url}`) : false);

const reqInterceptor = (instance) =>
  instance.interceptors.request.use(
    (config) => {
      const authUser = localStorage.getItem("authUser");
      let accessToken;
      if (authUser) accessToken = JSON.parse(authUser).accessToken;
      if (accessToken) config.headers["x-access-token"] = accessToken;

      requestLog(config);
      return config;
    },
    (error) => Promise.reject(error)
  );

const resInterceptor = (instance) =>
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log(error);
      console.warn("Error status", error.response ? error.response.status : error.code);

      let message = "Ha ocurrido un error inesperado, por favor intenta más tarde, si el problema persiste contacte a soporte.";
      if (error.code === "ECONNABORTED") message = "Se ha agotado el tiempo de espera, por favor revise su conexión a internet. Si el problema persiste contacte a soporte.";

      if (error.response) {
        const code = error.response.data.code;
        if (code) message = getCodeMessage(code);

        error.response.message = message;
        return Promise.reject(error.response);
      } else if (error.request) {
        message = "Se ha caido la conexión, por favor revise su conexión a internet. Si el problema persiste contacte a soporte.";
        error.message = message;
      } else error.message = message;
      return Promise.reject(error);
    }
  );

const authInstance = axios.create({
  baseURL: `${process.env.REACT_APP_STAGE === "prod" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL}/auth-service/api/v1/admin`,
});
reqInterceptor(authInstance);
resInterceptor(authInstance);

const exchangeInstance = axios.create({
  baseURL: `${process.env.REACT_APP_STAGE === "prod" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL}/exchange-service/api/v1/admin`,
});
reqInterceptor(exchangeInstance);
resInterceptor(exchangeInstance);

const accountsInstance = axios.create({
  baseURL: `${process.env.REACT_APP_STAGE === "prod" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL}/accounts-service/api/v1/admin`,
});
reqInterceptor(accountsInstance);
resInterceptor(accountsInstance);

export { authInstance, exchangeInstance, accountsInstance };
