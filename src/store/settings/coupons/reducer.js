import * as types from './types';
const initialState = {
  coupons: [],
  couponDetails: {},
  isLoading: true,
  isProcessing: false,
};

const couponsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COUPONS_SUCCESS:
      return { ...state, coupons: action.coupons, isLoading: false };
    case types.GET_COUPONS_DETAILS_SUCCESS:
      return { ...state, couponDetails: action.details };
    case types.ADD_COUPON_INIT:
    case types.DELETE_COUPON_INIT:
    case types.EDIT_COUPON_INIT:
      return { ...state, isProcessing: true };
    case types.ADD_COUPON_SUCCESS:
    case types.DELETE_COUPON_SUCCESS:
    case types.EDIT_COUPON_SUCCESS:
      return { ...state, isProcessing: false };
    case types.COUPONS_ERROR:
      return { ...state, isLoading: false, isProcessing: false };
    default:
      return state;
  }
};

export default couponsReducer;
