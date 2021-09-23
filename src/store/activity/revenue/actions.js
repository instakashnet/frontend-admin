import * as types from "./types";

export const getRevenue = (rate) => ({
  type: types.GET_REVENUE_INIT,
  rate,
});

export const getRevenueSuccess = (data) => ({
  type: types.GET_REVENUE_SUCCESS,
  data,
});

export const apiError = () => ({
  type: types.API_ERROR,
});
