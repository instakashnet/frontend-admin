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

export const addCurrencyPriceSuccess = () => ({
  type: actionTypes.ADD_CURRENCY_PRICE_SUCCESS,
});

export const apiError = () => ({
  type: actionTypes.API_ERROR,
});
