import * as actionTypes from "./actionTypes";

const initialState = {
  banks: [],
  bankData: null,
  error: "",
  success: "",
  isLoading: true,
  isProcessing: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_BANKS:
      return { ...state, isLoading: true };

    case actionTypes.GET_BANKS_SUCCESS:
      return { ...state, banks: payload.banks, isLoading: false };

    case actionTypes.ADD_BANK:
      return { ...state, isProcessing: true };

    case actionTypes.ADD_BANK_SUCCESS:
    case actionTypes.EDIT_BANK_SUCCESS:
      return { ...state, isProcessing: false, success: payload };

    case actionTypes.CLEAR_SUCCESS_ALERT:
      return { ...state, success: "" };
    case actionTypes.CLEAR_ERROR_ALERT:
      return { ...state, error: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload, isLoading: false, isProcessing: false };
    default:
      return state;
  }
}
