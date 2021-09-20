import * as actionTypes from "./actionTypes";

export const getCounters = () => ({
  type: actionTypes.GET_COUNTERS,
});

export const getCountersSuccess = (data) => ({
  type: actionTypes.GET_COUNTERS_SUCCESS,
  data,
});

export const getTotalKashInit = () => ({
  type: actionTypes.GET_TOTAL_KASH_INIT,
});

export const getTotalKashSuccess = (total) => ({
  type: actionTypes.GET_TOTAL_KASH_SUCCESS,
  total,
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
