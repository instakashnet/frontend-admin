import * as actionTypes from "./actionTypes";

export const getClientBinnacle = () => ({
  type: actionTypes.GET_CLIENT_BINNACLE,
});

export const getClientBinnacleSuccess = (activity) => ({
  type: actionTypes.GET_CLIENT_BINNACLE_SUCCESS,
  payload: { activity },
});

export const getAdminBinnacle = () => ({
  type: actionTypes.GET_ADMIN_BINNACLE,
});

export const getAdminBinnacleSuccess = (activity) => ({
  type: actionTypes.GET_ADMIN_BINNACLE_SUCCESS,
  payload: { activity },
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
