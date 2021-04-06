import * as actionTypes from "./actionTypes";

export const getCounters = () => ({
  type: actionTypes.GET_COUNTERS,
});

export const getCountersSuccess = (data) => ({
  type: actionTypes.GET_COUNTERS_SUCCESS,
  payload: { data },
});

export const apiError = (msg) => ({
  type: actionTypes.API_ERROR,
  payload: msg,
});
