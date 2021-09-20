import * as types from "./types";
const initalState = {
  isLoading: false,
  revenueData: {},
};

export const revenueReducer = (state = initalState, action = {}) => {
  switch (action.type) {
    case types.GET_REVENUE_INIT:
      return { ...state, isLoading: true };
    case types.GET_REVENUE_SUCCESS:
      return { ...state, isLoading: false, revenueData: action.data };
    case types.API_ERROR:
      return initalState;
    default:
      return state;
  }
};
