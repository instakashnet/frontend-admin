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
export const getOperatorsInit = () => ({
  type: types.GET_OPERATORS.INIT,
});

export const getOperatorsSuccess = (operators) => ({
  type: types.GET_OPERATORS.SUCCESS,
  operators,
});

export const getOperatorsError = () => ({
  type: types.GET_OPERATORS.ERROR,
});

// --------------- //

// SET ADMIN ONLINE ACTIONS
export const setAdminOnlineInit = (userId) => ({
  type: types.SET_ONLINE.INIT,
  userId,
});

export const setAdminOnlineSuccess = () => ({
  type: types.SET_ONLINE.SUCCESS,
});

export const setAdminOnlineError = () => ({
  type: types.SET_ONLINE.ERROR,
});
