import * as types from "./types";

export const getCountriesInit = () => ({
  type: types.GET_COUNTRIES_INIT,
});

export const getCountriesSuccess = (countries) => ({
  type: types.GET_COUNTRIES_SUCCESS,
  countries,
});

export const getCurrenciesInit = () => ({
  type: types.GET_CURRENCIES_INIT,
});

export const getCurrenciesSuccess = (currencies) => ({
  type: types.GET_CURRENCIES_SUCCESS,
  currencies,
});

export const apiError = (msg) => ({
  type: types.API_ERROR,
  msg,
});
