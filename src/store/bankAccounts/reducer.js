import * as actionTypes from "./actionTypes";
const initialState = {
  accounts: [],
  success: "",
  isLoading: true,
  isProcessing: false,
};

export default function bankAccountsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ADD_CB_ACCOUNT:
    case actionTypes.EDIT_CB_BALANCE:
    case actionTypes.EDIT_CB_ACCOUNT:
      return { ...state, isProcessing: true };
    case actionTypes.ADD_CB_ACCOUNT_SUCCESS:
    case actionTypes.EDIT_CB_BALANCE_SUCCESS:
    case actionTypes.EDIT_CB_ACCOUNT_SUCCESS:
      return { ...state, isProcessing: false };

    case actionTypes.GET_CB_ACCOUNTS:
      return { ...state, isLoading: true };
    case actionTypes.GET_CB_ACCOUNTS_SUCCESS:
      return { ...state, isLoading: false, accounts: payload.data };

    case actionTypes.API_ERROR:
      return { ...state, isProcessing: false, isLoading: false };

    default:
      return state;
  }
}
