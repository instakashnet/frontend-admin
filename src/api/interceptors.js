import { logoutUserSuccess } from "../store/actions";

let store;
const requestLog = (config) => (process.env.REACT_APP_STAGE !== "prod" ? console.log(`Request sent to ${config.url}`) : false);

export const injectStore = (_store) => (store = _store);

export const setAxiosInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      requestLog(config);

      const accessToken = store.getState().Login.token;
      if (accessToken) config.headers["x-access-token"] = accessToken;

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log(error);
      const originalRequest = error.config,
        status = error.status || error.response.status;

      if (status === 418 && !originalRequest._retry) {
        originalRequest._retry = true;
        store.dispatch(logoutUserSuccess());
      } else {
        let message;
        let code;
        if (error.response) {
          if (error.response.data.error) {
            message = error.response.data.error.message;
            code = error.response.data.error.code;
          } else message = "Ha ocurrido un error inesperado, por favor intenta de nuevo. Si el problema persiste contacte a soporte.";
        } else if (error.request) message = "Se ha caido la conexión, por favor revise su conexión a internet. Si el problema persiste contacte a soporte.";

        error.message = message;
        error.code = code;
      }

      return Promise.reject(error);
    }
  );
};
