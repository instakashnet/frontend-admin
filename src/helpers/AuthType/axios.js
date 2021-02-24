import axios from "axios";

const timeout = 4000;
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
        error.response.message = message;

        return Promise.reject(error.response);
      } else {
        error.message = message;
        return Promise.reject(error);
      }
    }
  );

const authInstance = axios.create({
  baseURL: "https://auth-service-instakash.herokuapp.com/api/v1",
  timeout,
  withCredentials: false,
});
reqInterceptor(authInstance);
resInterceptor(authInstance);

const exchangeInstance = axios.create({
  baseURL: "https://instakash-exchange-service.herokuapp.com/api/v1",
  timeout,
  withCredentials: false,
});
reqInterceptor(exchangeInstance);
resInterceptor(exchangeInstance);

const accountsInstance = axios.create({
  baseURL: "https://instakash-accounts-service.herokuapp.com/api/v1",
  timeout,
  withCredentials: true,
});
reqInterceptor(accountsInstance);
resInterceptor(accountsInstance);

export { authInstance, exchangeInstance, accountsInstance };
