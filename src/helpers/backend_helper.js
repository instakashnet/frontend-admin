import { authInstance } from "./AuthType/axios";
import axios from "axios";

// Gets the logged in user data from local session
const getLoggedInUser = (userId) => {
  // if (userId) {
  //   return authInstance
  //     .get(`/Usuario/ObtenerUsuario?Id=${userId}`)
  //     .then((response) => {
  //       if (response.status === 400 || response.status === 500) throw response.data;
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }
  // return null;
};

// Login Method
const postJwtProfile = (url, data) => {
  // return axios
  //   .post(url, data, {
  //     headers: {
  //       Authorization:
  //         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImp0aSI6ImQ2MTEwYzAxLWMwYjUtNDUzNy1iNDZhLTI0NTk5Mjc2YjY1NiIsImlhdCI6MTU5MjU2MDk2MCwiZXhwIjoxNTkyNTY0NjE5fQ.QgFSQtFaK_Ktauadttq1Is7f9w0SUtKcL8xCmkAvGLw",
  //     },
  //   })
  //   .then((response) => {
  //     if (response.status === 400 || response.status === 500) throw response.data;
  //     return response.data;
  //   })
  //   .catch((err) => {
  //     throw err[1];
  //   });
};

// Register Method
const postJwtRegister = (url, data) => {
  // return axios
  //   .post(url, data)
  //   .then((response) => {
  //     if (response.status >= 200 || response.status <= 299) return response.data;
  //     throw response.data;
  //   })
  //   .catch((err) => {
  //     var message;
  //     if (err.response && err.response.status) {
  //       switch (err.response.status) {
  //         case 404:
  //           message = "Sorry! the page you are looking for could not be found";
  //           break;
  //         case 500:
  //           message = "Sorry! something went wrong, please contact our support team";
  //           break;
  //         case 401:
  //           message = "Invalid credentials";
  //           break;
  //         default:
  //           message = err[1];
  //           break;
  //       }
  //     }
  //     throw message;
  //   });
};

// Login Method
const postJwtLogin = (url, data) => {
  // return defaultAxios
  //   .post(url, data)
  //   .then((response) => {
  //     if (response.status === 400 || response.status === 500) throw response.data;
  //     return response.data;
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });
};

export { getLoggedInUser, postJwtRegister, postJwtLogin, postJwtProfile };
