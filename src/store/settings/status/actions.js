import * as actionTypes from "./actionTypes";

export const getStatus = () => ({
  type: actionTypes.GET_STATUS,
});

export const getStatusSuccess = (status) => ({
  type: actionTypes.GET_STATUS_SUCCESS,
  status,
});

export const editStatus = (values, id, setState) => ({
  type: actionTypes.EDIT_STATUS,
  values,
  id,
  setState,
});

export const editStatusSuccess = (msg) => ({
  type: actionTypes.EDIT_STATUS_SUCCESS,
  payload: msg,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
