import * as actionTypes from "./actionTypes";
const initialState = {
  currencyBarData: {},
  advanceBarData: {},
  usersData: [],
  error: "",
  isLoading: true,
};

export default function chartsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CURRENCY_BAR_CHART_SUCCESS:
      return { ...state, currencyBarData: payload.data, isLoading: false };

    case actionTypes.GET_ADVANCE_BAR_CHART_SUCCESS:
      return { ...state, advanceBarData: payload.data, isLoading: false };

    case actionTypes.GET_USERS_CHART_SUCCESS:
      return { ...state, usersData: payload.data, isLoading: false };

    case actionTypes.API_ERROR:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
}
