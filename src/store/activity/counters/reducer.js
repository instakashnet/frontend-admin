import * as actionTypes from './actionTypes';
const initialState = {
  counters: { ordersCount: 0, usersCount: 0 },
  totalKash: 0,
  error: '',
  isLoading: true,
};

export default function countersReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_COUNTERS_SUCCESS:
      return { ...state, counters: payload.data, isLoading: false };
    case actionTypes.GET_TOTAL_KASH_SUCCESS:
      return { ...state, totalKash: action.total, isLoading: false };

    default:
      return state;
  }
}
