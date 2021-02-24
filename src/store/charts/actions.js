import * as actionTypes from "./actionTypes";

export const getCurrencyBarChart = () => ({
  type: actionTypes.GET_CURRENCY_BAR_CHART,
});

export const getCurrencyBarChartSuccess = (data) => ({
  type: actionTypes.GET_CURRENCY_BAR_CHART_SUCCESS,
  payload: { data },
});

export const getAdvanceBarChart = () => ({
  type: actionTypes.GET_ADVANCE_BAR_CHART,
});

export const getAdvanceBarChartSuccess = (data) => ({
  type: actionTypes.GET_ADVANCE_BAR_CHART_SUCCESS,
  payload: { data },
});

export const getUsersChart = () => ({
  type: actionTypes.GET_USERS_CHART,
});

export const getUsersChartSuccess = (data) => ({
  type: actionTypes.GET_USERS_CHART_SUCCESS,
  payload: { data },
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
