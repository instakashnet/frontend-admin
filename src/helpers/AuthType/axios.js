import axios from "axios";

const timeout = 13000;
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

        if (code === 2004) message = "Las credenciales de acceso no son correctas.";
        if (code === 2023) message = "Este nombre ya existe en otro cupón.";

        error.response.message = message;

        return Promise.reject(error.response);
      } else {
        error.message = message;
        return Promise.reject(error);
      }
    }
  );

const authInstance = axios.create({
  baseURL: process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_AUTH_API : process.env.REACT_APP_AUTH_API,
  timeout,
});
reqInterceptor(authInstance);
resInterceptor(authInstance);

const exchangeInstance = axios.create({
  baseURL: process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_EXCHANGE_API : process.env.REACT_APP_EXCHANGE_API,
  timeout,
});
reqInterceptor(exchangeInstance);
resInterceptor(exchangeInstance);

const accountsInstance = axios.create({
  baseURL: process.env.NODE_ENV !== "production" ? process.env.REACT_APP_TEST_ACCOUNTS_API : process.env.REACT_APP_ACCOUNTS_API,
  timeout,
});
reqInterceptor(accountsInstance);
resInterceptor(accountsInstance);

export { authInstance, exchangeInstance, accountsInstance };
