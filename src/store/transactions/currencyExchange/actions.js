import * as actionTypes from "./actionTypes";

export const getExchangesRelationInit = (values, excelType) => ({
  type: actionTypes.GET_EXCHANGES_RELATION_INIT,
  values,
  excelType,
});

export const getExchangesRelationSuccess = () => ({
  type: actionTypes.GET_EXCHANGES_RELATION_SUCCESS,
});

export const uploadBankConciliation = (values, setUploaded) => ({
  type: actionTypes.UPLOAD_CONCILIATION.INIT,
  values,
  setUploaded,
});

export const uploadBankConciliationSuccess = () => ({
  type: actionTypes.UPLOAD_CONCILIATION.SUCCESS,
});

export const downloadBankConciliation = (date) => ({
  type: actionTypes.DOWNLOAD_CONCILIATION.INIT,
  date,
});

export const downloadBankConciliationSuccess = () => ({
  type: actionTypes.DOWNLOAD_CONCILIATION.SUCCESS,
});

export const getExchangeDetails = (id) => ({
  type: actionTypes.GET_EXCHANGE_DETAILS,
  id,
});

export const getExchangeDetailsSuccess = (details) => ({
  type: actionTypes.GET_EXCHANGE_DETAILS_SUCCESS,
  payload: { details },
});

export const changeStatusInit = (orderId, statusId) => ({
  type: actionTypes.CHANGE_STATUS.INIT,
  orderId,
  statusId,
});

export const changeStatusSuccess = () => ({
  type: actionTypes.CHANGE_STATUS.SUCCESS,
});

export const changeStatusCancelled = () => ({
  type: actionTypes.CHANGE_STATUS.CANCELLED,
});

export const processOrderInit = (orderId, values, closeModal) => ({
  type: actionTypes.PROCESS_ORDER.INIT,
  orderId,
  values,
  closeModal,
});

export const processOrderSuccess = () => ({
  type: actionTypes.PROCESS_ORDER.SUCCESS,
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
