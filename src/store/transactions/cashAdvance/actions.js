import * as actionTypes from "./actionTypes";

export const getAdvanceDetails = (id) => ({
  type: actionTypes.GET_ADVANCE_DETAILS,
  payload: { id },
});

export const getAdvanceDetailsSuccess = (details) => ({
  type: actionTypes.GET_ADVANCE_DETAILS_SUCCESS,
  payload: { details },
});

export const approveCashAdvance = (id, details, connection, close, closeApprove, invoice = null) => ({
  type: actionTypes.APPROVE_CASH_ADVANCE,
  payload: { id, details, close, closeApprove, connection, invoice },
});

export const approveCashAdvanceSuccess = () => ({
  type: actionTypes.APPROVE_CASH_ADVANCE_SUCCESS,
});

export const approveCashAdvanceCancel = () => ({
  type: actionTypes.APPROVE_CASH_ADVANCE_CANCELED,
});

export const declineCashAdvance = (id) => ({
  type: actionTypes.DECLINE_CASH_ADVANCE,
  payload: { id },
});

export const declineCashAdvanceSuccess = () => ({
  type: actionTypes.DECLINE_CASH_ADVANCE_SUCCESS,
});

export const declineCashAdvanceCancel = () => ({
  type: actionTypes.DECLINE_CASH_ADVANCE_CANCELED,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
