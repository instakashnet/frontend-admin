import * as actionTypes from "./actionTypes";
const initialState = {
  counters: null,
  error: "",
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_COUNTERS_SUCCESS:
      return { ...state, counters: payload.data, isLoading: false };

    default:
      return state;
  }
}
