import * as actionTypes from "./actionTypes";
const initialState = {
  clients: [],
  details: null,
  accounts: [],
  exchanges: [],
  error: "",
  success: "",
  isLoading: true,
  isProcessing: false,
};

export default function clientsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CLIENTS_SUCCESS:
      return { ...state, clients: action.clients, isLoading: false };

    case actionTypes.GET_CLIENT_DETAILS_SUCCESS:
      return { ...state, details: payload.data, isLoading: false };

    case actionTypes.GET_CLIENT_EXCHANGES_SUCCESS:
      return { ...state, exchanges: action.orders, isLoading: false };

    case actionTypes.GET_CLIENT_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.accounts, isLoading: false };

    case actionTypes.EDIT_PROFILE_SUCCESS:
      return { ...state, isProcessing: false };

    case actionTypes.CLEAR_ALERT:
      return { ...state, success: "", error: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload, isProcessing: false, isLoading: false };

    default:
      return state;
  }
}
