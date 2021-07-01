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

export const editBank = (id, values, reset) => ({
  type: actionTypes.EDIT_BANK,
  payload: { id, values, reset },
});

export const editBankSuccess = (msg) => ({
  type: actionTypes.EDIT_BANK_SUCCESS,
  payload: msg,
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
