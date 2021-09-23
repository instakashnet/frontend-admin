import * as actionTypes from "./actionTypes";
const initialState = {
  counters: { ordersCount: 0, usersCount: 0 },
  totalKash: 0,
  error: null,
  isLoading: true,
};

export default function countersReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.GET_COUNTERS:
    case actionTypes.GET_TOTAL_KASH_INIT:
      return { ...state, isLoading: true };
    case actionTypes.GET_COUNTERS_SUCCESS:
      return { ...state, counters: action.data, isLoading: false };
    case actionTypes.GET_TOTAL_KASH_SUCCESS:
      return { ...state, totalKash: action.total, isLoading: false };

    default:
      return state;
  }
}
