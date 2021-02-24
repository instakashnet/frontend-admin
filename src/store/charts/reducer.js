import * as actionTypes from "./actionTypes";
const initialState = {
  currencyBarData: {},
  advanceBarData: {},
  usersData: [],
  error: "",
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CURRENCY_BAR_CHART_SUCCESS:
      return { ...state, currencyBarData: payload.data };

    case actionTypes.GET_ADVANCE_BAR_CHART_SUCCESS:
      return { ...state, advanceBarData: payload.data };

    case actionTypes.GET_USERS_CHART_SUCCESS:
      return { ...state, usersData: payload.data };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
