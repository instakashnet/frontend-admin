import * as actionTypes from "./actionTypes";
const initialState = {
  schedule: [],
  error: "",
  success: "",
  isLoading: true,
  isProcessing: false,
};

export default function shceduleReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.EDIT_SCHEDULE:
      return { ...state, isProcessing: true };
    case actionTypes.EDIT_SCHEDULE_SUCCESS:
      return { ...state, isProcessing: false };

    case actionTypes.GET_SCHEDULE:
      return { ...state, isLoading: true };

    case actionTypes.GET_SCHEDULE_SUCCESS:
      return { ...state, schedule: payload.schedule, isLoading: false };

    case actionTypes.CLEAR_ALERT:
      return { ...state, error: "", success: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload, isLoading: false, isProcessing: false };

    default:
      return state;
  }
}
