import * as actionTypes from "./actionTypes";

export const getExchangesRelationInit = (values, excelType) => ({
  type: actionTypes.GET_EXCHANGES_RELATION_INIT,
  values,
  excelType,
});

export const getExchangesRelationSuccess = () => ({
  type: actionTypes.GET_EXCHANGES_RELATION_SUCCESS,
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

export const approveExchange = (orderId, values, closeModal) => ({
  type: actionTypes.APPROVE_EXCHANGE,
  orderId,
  values,
  closeModal,
});

export const approveExchangeSuccess = () => ({
  type: actionTypes.APPROVE_EXCHANGE_SUCCESS,
});

export const approveExchangeCancel = () => ({
  type: actionTypes.APPROVE_EXCHANGE_CANCELED,
});

export const declineExchange = (orderId, history, closeModal) => ({
  type: actionTypes.DECLINE_EXCHANGE,
  orderId,
  history,
  closeModal,
});

export const declineExchangeSuccess = () => ({
  type: actionTypes.DECLINE_EXCHANGE_SUCCESS,
});

export const declineExchangeCancel = () => ({
  type: actionTypes.DECLINE_EXCHANGE_CANCELED,
});

export const editExchange = (id, values, closeModal) => ({
  type: actionTypes.EDIT_EXCHANGE,
  id,
  values,
  closeModal,
});

export const editExchangeSuccess = () => ({
  type: actionTypes.EDIT_EXCHANGE_SUCCESS,
});

export const changeOrderStatus = (id, status) => ({
  type: actionTypes.CHANGE_ORDER_STATUS_INIT,
  id,
  status,
});

export const changeOrderStatusSuccess = () => ({
  type: actionTypes.CHANGE_ORDER_STATUS_SUCCESS,
});

export const createInvoice = (orderId) => ({
  type: actionTypes.CREATE_INVOICE,
  orderId,
});

export const createInvoiceSuccess = (msg) => ({
  type: actionTypes.CREATE_INVOICE_SUCCESS,
  msg,
});

export const reassignOrderInit = (values, orderId, closeModal) => ({
  type: actionTypes.REASSIGN_ORDER_INIT,
  values,
  orderId,
  closeModal,
});

export const reassignOrderSuccess = () => ({
  type: actionTypes.REASSIGN_ORDER_SUCCESS,
});

export const setRevisionInit = (values, orderId, closeModal) => ({
  type: actionTypes.SET_REVISION_INIT,
  values,
  orderId,
  closeModal,
});

export const setRevisionSuccess = () => ({
  type: actionTypes.SET_REVISION_SUCCESS,
});

export const apiError = () => ({
  type: actionTypes.API_ERROR,
});
