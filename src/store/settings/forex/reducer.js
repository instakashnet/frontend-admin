import * as actionTypes from "./actionTypes";

const initialState = {
  activeRates: null,
  allRates: [],
  forexTypes: [],
  currencySelected: null,
  error: "",
  success: "",
  isUpdating: false,
  isLoading: true,
};

export default function forexReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_RATES_INIT:
      return { ...state, isLoading: true };

    case actionTypes.GET_FOREX_SUCCESS:
      return { ...state, isLoading: false, forexTypes: action.combinations };

    case actionTypes.GET_RATES_SUCCESS:
      return { ...state, isLoading: false, activeRates: action.rates };

    case actionTypes.GET_ALL_RATES_SUCCESS:
      return { ...state, isLoading: false, allRates: action.rates };

    case actionTypes.ADD_CURRENCY_PRICE_INIT:
      return { ...state, isUpdating: true };

    case actionTypes.ADD_CURRENCY_PRICE_SUCCESS:
      return { ...state, success: payload, isUpdating: false };

    case actionTypes.CLEAR_ALERT:
      return { ...state, success: "", error: "" };
    case actionTypes.API_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}
