import * as actionTypes from "./actionTypes";

export const getExchangesSuccess = (orders) => ({
  type: actionTypes.GET_EXCHANGES_SUCCESS,
  orders,
});

export const getExchangeDetails = (id) => ({
  type: actionTypes.GET_EXCHANGE_DETAILS,
  id,
});

export const getExchangeDetailsSuccess = (details) => ({
  type: actionTypes.GET_EXCHANGE_DETAILS_SUCCESS,
  payload: { details },
});

export const validateExchange = (orderId, history) => ({
  type: actionTypes.VALIDATE_EXCHANGE,
  orderId,
  history,
});

export const validateExchangeSuccess = () => ({
  type: actionTypes.VALIDATE_EXCHANGE_SUCCESS,
});

export const approveExchange = (orderId, values, closeModal, history) => ({
  type: actionTypes.APPROVE_EXCHANGE,
  orderId,
  values,
  closeModal,
  history,
});

export const approveExchangeSuccess = () => ({
  type: actionTypes.APPROVE_EXCHANGE_SUCCESS,
});

export const approveExchangeCancel = () => ({
  type: actionTypes.APPROVE_EXCHANGE_CANCELED,
});

export const declineExchange = (orderId, history) => ({
  type: actionTypes.DECLINE_EXCHANGE,
  orderId,
  history,
});

export const declineExchangeSuccess = () => ({
  type: actionTypes.DECLINE_EXCHANGE_SUCCESS,
});

export const declineExchangeCancel = () => ({
  type: actionTypes.DECLINE_EXCHANGE_CANCELED,
});

export const editExchange = (id, details, values, update) => ({
  type: actionTypes.EDIT_EXCHANGE,
  payload: { id, details, values, update },
});

export const editExchangeSuccess = (msg) => ({
  type: actionTypes.EDIT_EXCHANGE_SUCCESS,
  payload: msg,
});

export const createInvoice = (orderId) => ({
  type: actionTypes.CREATE_INVOICE,
  orderId,
});

export const createInvoiceSuccess = () => ({
  type: actionTypes.CREATE_INVOICE_SUCCESS,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
