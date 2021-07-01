import * as actionTypes from "./actionTypes";

export const getClientDetails = (userId) => ({
  type: actionTypes.GET_CLIENT_DETAILS,
  userId,
});

export const getClientDetailsSuccess = (data) => ({
  type: actionTypes.GET_CLIENT_DETAILS_SUCCESS,
  payload: { data },
});

export const getClientExchanges = (userId) => ({
  type: actionTypes.GET_CLIENT_EXCHANGES,
  userId,
});

export const getClientExchangesSuccess = (orders) => ({
  type: actionTypes.GET_CLIENT_EXCHANGES_SUCCESS,
  orders,
});

export const getClientAccounts = (id) => ({
  type: actionTypes.GET_CLIENT_ACCOUNTS,
  id,
});

export const getClientAccountsSuccess = (accounts) => ({
  type: actionTypes.GET_CLIENT_ACCOUNTS_SUCCESS,
  accounts,
});

export const addProfileInit = (values, closeModal) => ({
  type: actionTypes.ADD_PROFILE_INIT,
  values,
  closeModal,
});

export const addProfileSuccess = () => ({
  type: actionTypes.ADD_PROFILE_SUCCESS,
});

export const editProfileInit = (values, closeModal) => ({
  type: actionTypes.EDIT_PROFILE_INIT,
  values,
  closeModal,
});

export const editClientInfoInit = (values, userId, closeModal) => ({
  type: actionTypes.EDIT_INFO_INIT,
  values,
  closeModal,
  userId,
});

export const editClientInfoSuccess = () => ({
  type: actionTypes.EDIT_INFO_SUCCESS,
});

export const editProfileSuccess = () => ({
  type: actionTypes.EDIT_PROFILE_SUCCESS,
});

export const downloadClientsInit = (fileType) => ({
  type: actionTypes.DOWNLOAD_CLIENTS_INIT,
  fileType,
});

export const downloadClientsSuccess = () => ({
  type: actionTypes.DOWNLOAD_CLIENTS_SUCCESS,
});

export const editInterplazaInit = (values, detailsType, id, setState) => ({
  type: actionTypes.EDIT_INTERPLAZA_INIT,
  values,
  detailsType,
  id,
  setState,
});

export const editInterplazaSuccess = () => ({
  type: actionTypes.EDIT_INTERPLAZA_SUCCESS,
});

export const disableClientInit = (userId, active) => ({
  type: actionTypes.DISABLE_CLIENT_INIT,
  userId,
  active,
});

export const disableClientSuccess = () => ({
  type: actionTypes.DISABLE_CLIENT_SUCCESS,
});

export const apiError = () => ({
  type: actionTypes.API_ERROR,
});
