import * as actionTypes from "./actionTypes";

export const getForexInit = () => ({
  type: actionTypes.GET_FOREX_INIT,
});

export const getForexSuccess = (combinations) => ({
  type: actionTypes.GET_FOREX_SUCCESS,
  combinations,
});

export const getAllRatesInit = () => ({
  type: actionTypes.GET_ALL_RATES_INIT,
});

export const getAllRateSuccess = (rates) => ({
  type: actionTypes.GET_ALL_RATES_SUCCESS,
  rates,
});

export const getForexRatesInit = (forexId) => ({
  type: actionTypes.GET_RATES_INIT,
  forexId,
});

export const getForexRatesSuccess = (rates) => ({
  type: actionTypes.GET_RATES_SUCCESS,
  rates,
});

export const addCurrencyPrice = (values) => ({
  type: actionTypes.ADD_CURRENCY_PRICE_INIT,
  values,
});

export const addCurrencyPriceSuccess = (msg) => ({
  type: actionTypes.ADD_CURRENCY_PRICE_SUCCESS,
  payload: msg,
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
