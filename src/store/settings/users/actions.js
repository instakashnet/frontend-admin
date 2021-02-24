import * as actionTypes from "./actionTypes";

export const getUsers = () => ({
  type: actionTypes.GET_USERS,
});

export const getUsersSuccess = (users) => ({
  type: actionTypes.GET_USERS_SUCCESS,
  payload: [...users],
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});
