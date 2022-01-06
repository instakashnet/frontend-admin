import * as actionTypes from "./actionTypes";
const initialState = {
  details: null,
  accounts: [],
  exchanges: [],
  widthdrawals: [],
  isLoading: false,
  isProcessing: false,
};

export default function clientsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CLIENT_DETAILS:
      return { ...state, isLoading: true };

    case actionTypes.ADD_PROFILE_INIT:
    case actionTypes.EDIT_PROFILE_INIT:
    case actionTypes.EDIT_INFO_INIT:
    case actionTypes.DISABLE_CLIENT_INIT:
    case actionTypes.UPLOAD_DOCUMENT_INIT:
      return { ...state, isProcessing: true };

    case actionTypes.GET_CLIENT_DETAILS_SUCCESS:
      return { ...state, details: payload.data, isLoading: false };

    case actionTypes.GET_CLIENT_EXCHANGES:
      return { ...state, exchanges: [], isLoading: true };
    case actionTypes.GET_CLIENT_EXCHANGES_SUCCESS:
      return { ...state, exchanges: action.orders, isLoading: false };

    case actionTypes.GET_CLIENT_ACCOUNTS:
      return { ...state, accounts: [], isLoading: true };
    case actionTypes.GET_CLIENT_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.accounts, isLoading: false };

    case actionTypes.ADD_PROFILE_SUCCESS:
    case actionTypes.EDIT_PROFILE_SUCCESS:
    case actionTypes.EDIT_INFO_SUCCESS:
    case actionTypes.DISABLE_CLIENT_SUCCESS:
    case actionTypes.UPLOAD_DOCUMENT_SUCCESS:
      return { ...state, isProcessing: false };

    case actionTypes.API_ERROR:
      return { ...state, isProcessing: false, isLoading: false };

    default:
      return state;
  }
}
