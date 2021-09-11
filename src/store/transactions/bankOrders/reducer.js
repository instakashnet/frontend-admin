import * as types from "./types";
const initialState = {
  bankOrderDetails: {},
  isLoading: true,
  isProcessing: false,
};

export const bankOrdersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CREATE_BANK_ORDER_INIT:
      return { ...state, isProcessing: true };
    case types.CREATE_BANK_ORDER_SUCCESS:
      return { ...state, isProcessing: false };
    case types.GET_BANK_ORDER_DETAILS_INIT:
      return { ...state, isLoading: true, bankOrderDetails: {} };
    case types.GET_BANK_ORDER_DETAILS_SUCCESS:
      return { ...state, isLoading: false, bankOrderDetails: action.details };
    case types.API_ERROR:
      return { isProcessing: false, isLoading: false };
    default:
      return state;
  }
};
