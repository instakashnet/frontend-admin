import * as actionTypes from "./actionTypes";
const initialState = {
  status: [],
  error: "",
  success: "",
  isLoading: true,
  isProcessing: false,
};

export default function statusReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.EDIT_STATUS:
      return { ...state, isProcessing: true };

    case actionTypes.GET_STATUS_SUCCESS:
      return { ...state, status: action.status, isLoading: false };

    case actionTypes.EDIT_STATUS_SUCCESS:
      return { ...state, success: payload, isProcessing: false };

    case actionTypes.CLEAR_ALERT:
      return { ...state, error: "", success: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload, isLoading: false, isProcessing: false };

    default:
      return state;
  }
}
