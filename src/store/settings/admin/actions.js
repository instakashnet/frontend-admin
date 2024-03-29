import * as types from "./types";

// GET ADMINS ACTIONS
export const getAdminsInit = () => ({
  type: types.GET_ADMINS.INIT,
});

export const getAdminsSuccess = (admins) => ({
  type: types.GET_ADMINS.SUCCESS,
  admins,
});

export const getAdminsError = () => ({
  type: types.GET_ADMINS.ERROR,
});

// --------------- //

// GET OPERATORS ACTIONS
export const getOperatorsInit = (online) => ({
  type: types.GET_OPERATORS.INIT,
  online,
});

export const getOperatorsSuccess = (operators) => ({
  type: types.GET_OPERATORS.SUCCESS,
  operators,
});

export const getOperatorsError = () => ({
  type: types.GET_OPERATORS.ERROR,
});

// --------------- //

// SET OPERATOR ONLINE ACTIONS
export const setOperatorOnlineInit = (userId) => ({
  type: types.SET_ONLINE.INIT,
  userId,
});

export const setOperatorOnlineSuccess = () => ({
  type: types.SET_ONLINE.SUCCESS,
});

export const setOperatorOnlineError = () => ({
  type: types.SET_ONLINE.ERROR,
});

// --------------- //

// GET OPENED STATUS

export const getOpenedStatusInit = () => ({
  type: types.GET_OPENED_STATUS.INIT,
});

export const getOpenedStatusSuccess = (status) => ({
  type: types.GET_OPENED_STATUS.SUCCESS,
  payload: status,
});

export const getOpenedStatusError = () => ({
  type: types.GET_OPENED_STATUS.ERROR,
});

// --------------- //

// UPDATE OPENED STATUS

export const updateOpenedStatusInit = (status) => ({
  type: types.UPDATE_OPENED_STATUS.INIT,
  status,
});

export const updateOpenedStatusSuccess = (status) => ({
  type: types.UPDATE_OPENED_STATUS.SUCCESS,
  payload: status,
});

export const updateOpenedStatusError = () => ({
  type: types.UPDATE_OPENED_STATUS.ERROR,
});
