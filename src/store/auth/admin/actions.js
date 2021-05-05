import * as types from './types';

export const getOperatorsInit = () => ({
  type: types.GET_OPERATORS_INIT,
});

export const getOperatorsSuccess = (operators) => ({
  type: types.GET_OPERATORS_SUCCESS,
  operators,
});

export const usersError = (msg) => ({
  type: types.USERS_ERROR,
  msg,
});
