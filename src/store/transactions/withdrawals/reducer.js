import * as types from './types';
import { EDIT_INTERPLAZA_INIT, EDIT_INTERPLAZA_SUCCESS } from '../../settings/clients/actionTypes';

const initialState = {
  withdrawals: [],
  details: {},
  isLoading: true,
  isProcessing: false,
};

const withdrawalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_INTERPLAZA_INIT:
    case types.CHANGE_WITHDRAW_STATUS_INIT:
      return { ...state, isProcessing: true };
    case EDIT_INTERPLAZA_SUCCESS:
    case types.CHANGE_WITHDRAW_STATUS_SUCCESS:
      return { ...state, isProcessing: false };

    case types.GET_WITHDRAWS_SUCCESS:
      return { ...state, isLoading: false, withdrawals: action.withdrawals };
    case types.GET_WITHDRAW_DETAILS_INIT:
      return { ...state, isLoading: true };
    case types.GET_WITHDRAW_DETAILS_SUCCESS:
      return { ...state, details: action.details, isLoading: false };
    default:
      return state;
  }
};

export default withdrawalsReducer;
