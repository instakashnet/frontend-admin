import * as actionTypes from "./actionTypes";

export const refreshToken = () => ({
  type: actionTypes.REFRESH_TOKEN.INIT,
});

export const refreshTokenSuccess = (token) => ({
  type: actionTypes.REFRESH_TOKEN.SUCCESS,
  token,
});

export const loadUser = () => ({
  type: actionTypes.LOAD_USER,
});

export const loadUserSuccess = (user) => ({
  type: actionTypes.LOAD_USER_SUCCESS,
  user,
});

export const loginUser = (values) => ({
  type: actionTypes.LOGIN_USER,
  values,
});

export const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token,
  };
};

export const logoutUser = () => ({
  type: actionTypes.LOGOUT_USER,
});

export const logoutUserSuccess = () => {
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const setOnline = () => ({
  type: actionTypes.SET_ONLINE_INIT,
});

export const setOnlineSuccess = (user) => ({
  type: actionTypes.SET_ONLINE_SUCCESS,
  user,
});

export const apiError = () => {
  return {
    type: actionTypes.API_ERROR,
  };
};
