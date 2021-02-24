import * as actionTypes from "./actionTypes";
const initialState = {
  cashAdvances: [],
  advanceDetails: null,
  isLoading: true,
  isProcessing: false,
  error: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_ADVANCE_DETAILS:
      return { ...state, isLoading: true };
    case actionTypes.GET_ADVANCE_DETAILS_SUCCESS:
      return { ...state, advanceDetails: payload.details, isLoading: false };

    case actionTypes.APPROVE_CASH_ADVANCE:
    case actionTypes.DECLINE_CASH_ADVANCE:
      return { ...state, isProcessing: true };

    case actionTypes.APPROVE_CASH_ADVANCE_SUCCESS:
    case actionTypes.APPROVE_CASH_ADVANCE_CANCELED:
    case actionTypes.DECLINE_CASH_ADVANCE_SUCCESS:
    case actionTypes.DECLINE_CASH_ADVANCE_CANCELED:
      return { ...state, isProcessing: false };

    case actionTypes.CLEAR_ALERT:
      return { ...state, error: "" };
    case actionTypes.API_ERROR:
      return { ...state, error: payload, isLoading: false, isProcessing: false };

    default:
      return state;
  }
}
