import * as actionTypes from "./actionTypes";

export const getBanks = () => ({
  type: actionTypes.GET_BANKS,
});

export const getBanksSuccess = (banks) => ({
  type: actionTypes.GET_BANKS_SUCCESS,
  payload: { banks },
});

export const addBank = (values, setState) => ({
  type: actionTypes.ADD_BANK,
  values,
  setState,
});

export const addBankSuccess = (msg) => ({
  type: actionTypes.ADD_BANK_SUCCESS,
  payload: msg,
});

export const editBank = (id, values, close) => ({
  type: actionTypes.EDIT_BANK,
  id,
  values,
  close,
});

export const editBankSuccess = () => ({
  type: actionTypes.EDIT_BANK_SUCCESS,
});

export const toggleBank = (id, enabled) => ({
  type: actionTypes.TOGGLE_BANK,
  id,
  enabled,
});

export const toggleBankSuccess = () => ({
  type: actionTypes.TOGGLE_BANK_SUCCESS,
});

export const deleteBank = (id) => ({
  type: actionTypes.DELETE_BANK,
  payload: { id },
});

export const deleteBankSuccess = () => ({
  type: actionTypes.DELETE_BANK_SUCCESS,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
