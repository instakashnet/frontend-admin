import * as types from './types';

export const getWithdrawsInit = () => ({
  type: types.GET_WITHDRAWS_INIT,
});

export const getWithdrawsSuccess = (withdrawals) => ({
  type: types.GET_WITHDRAWS_SUCCESS,
  withdrawals,
});

export const getWithdrawalDetailsInit = (id) => ({
  type: types.GET_WITHDRAW_DETAILS_INIT,
  id,
});

export const getWithdrawalDetailsSuccess = (details) => ({
  type: types.GET_WITHDRAW_DETAILS_SUCCESS,
  details,
});

export const changeWithdrawalStatusInit = (id, statusId) => ({
  type: types.CHANGE_WITHDRAW_STATUS_INIT,
  id,
  statusId,
});

export const changeWithdrawalStatusSuccess = () => ({
  type: types.CHANGE_WITHDRAW_STATUS_SUCCESS,
});

export const withdrawalsError = () => ({
  type: types.WITHDRAWS_ERROR,
});
