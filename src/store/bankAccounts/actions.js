import * as actionTypes from "./actionTypes";

export const getCbAccounts = () => ({
  type: actionTypes.GET_CB_ACCOUNTS,
});

export const getCbAccountsSuccess = (data) => ({
  type: actionTypes.GET_CB_ACCOUNTS_SUCCESS,
  payload: { data },
});

export const addCbAccount = (values, setState) => ({
  type: actionTypes.ADD_CB_ACCOUNT,
  values,
  setState,
});

export const addCbAccountSuccess = () => ({
  type: actionTypes.ADD_CB_ACCOUNT_SUCCESS,
});

export const editCbAccount = (values, setState) => ({
  type: actionTypes.EDIT_CB_ACCOUNT,
  values,
  setState,
});

export const editCbAccountSuccess = () => ({
  type: actionTypes.EDIT_CB_ACCOUNT_SUCCESS,
});

export const editCbBalance = (values, accountId, setState) => ({
  type: actionTypes.EDIT_CB_BALANCE,
  values,
  accountId,
  setState,
});

export const editCbBalanceSuccess = () => ({
  type: actionTypes.EDIT_CB_BALANCE_SUCCESS,
});

export const apiError = () => ({
  type: actionTypes.API_ERROR,
});
