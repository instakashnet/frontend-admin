import * as actionTypes from "./actionTypes";
const initialState = {
  details: null,
  accounts: [],
  exchanges: [],
  withdrawals: [],
  affiliates: [],
  isLoading: false,
  isProcessing: false,
  isDataLoading: false,
};

export default function clientsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CLIENT_DETAILS:
    case actionTypes.GET_CLIENT_AFFILIATES:
      return { ...state, isLoading: true };

    case actionTypes.ADD_PROFILE_INIT:
    case actionTypes.ADD_CLIENT_BANK_ACCOUNT_INIT:
    case actionTypes.EDIT_CLIENT_BANK_ACCOUNT_INIT:
    case actionTypes.EDIT_PROFILE_INIT:
    case actionTypes.EDIT_INFO_INIT:
    case actionTypes.DISABLE_CLIENT_INIT:
    case actionTypes.UPLOAD_DOCUMENT_INIT:
    case actionTypes.DELETE_PROFILE_INIT:
    case actionTypes.DELETE_CLIENT_BANK_ACCOUNT_INIT:
    case actionTypes.SEND_NOTIFICATION_INIT:
      return { ...state, isProcessing: true };

    case actionTypes.GET_CLIENT_DETAILS_SUCCESS:
      return { ...state, details: payload.data, exchanges: [], withdrawals: [], isLoading: false };
    case actionTypes.GET_CLIENT_AFFILIATES_SUCCESS:
      return { ...state, affiliates: action.affiliates, isLoading: false };

    case actionTypes.GET_CLIENT_EXCHANGES:
      return { ...state, exchanges: [], isDataLoading: true };
    case actionTypes.GET_CLIENT_EXCHANGES_SUCCESS:
      return { ...state, exchanges: action.orders, isDataLoading: false };

    case actionTypes.GET_CLIENT_WITHDRAWALS:
      return { ...state, withdrawals: [], isDataLoading: true };
    case actionTypes.GET_CLIENT_WITHDRAWALS_SUCCESS:
      return { ...state, withdrawals: action.withdrawals, isDataLoading: false };

    case actionTypes.GET_CLIENT_ACCOUNTS:
      return { ...state, accounts: [], isLoading: true };
    case actionTypes.GET_CLIENT_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.accounts, isLoading: false };

    case actionTypes.ADD_PROFILE_SUCCESS:
    case actionTypes.ADD_CLIENT_BANK_ACCOUNT_SUCCESS:
    case actionTypes.EDIT_CLIENT_BANK_ACCOUNT_SUCCESS:
    case actionTypes.EDIT_PROFILE_SUCCESS:
    case actionTypes.EDIT_INFO_SUCCESS:
    case actionTypes.DISABLE_CLIENT_SUCCESS:
    case actionTypes.UPLOAD_DOCUMENT_SUCCESS:
    case actionTypes.DELETE_PROFILE_SUCCESS:
    case actionTypes.DELETE_CLIENT_BANK_ACCOUNT_SUCCESS:
    case actionTypes.SEND_NOTIFICATION_SUCCESS:
      return { ...state, isProcessing: false };

    case actionTypes.API_ERROR:
      return { ...state, isProcessing: false, isLoading: false };

    default:
      return state;
  }
}
