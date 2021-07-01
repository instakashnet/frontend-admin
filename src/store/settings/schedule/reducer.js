import * as actionTypes from "./actionTypes";
const initialState = {
  schedule: [],
  isLoading: true,
  isProcessing: false,
};

export default function scheduleReducer(state = initialState, action) {
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

    case actionTypes.API_ERROR:
      return { ...state, isLoading: false, isProcessing: false };

    default:
      return state;
  }
}
