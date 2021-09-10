import * as types from "./types";
const initialState = {
  bankOrderDetails: null,
  isLoading: true,
  isProcessing: false,
};

export const bankOrdersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CREATE_BANK_ORDER_INIT:
      return { ...state, isProcessing: true };
    case types.CREATE_BANK_ORDER_SUCCESS:
      return { ...state, isProcessing: false };
    case types.API_ERROR:
      return { isProcessing: false, isLoading: false };
    default:
      return state;
  }
};
