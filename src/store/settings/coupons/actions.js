import * as types from "./types";

export const getCouponsInit = () => ({
  type: types.GET_COUPONS_INIT,
});

export const getCouponsSuccess = (coupons) => ({
  type: types.GET_COUPONS_SUCCESS,
  coupons,
});

export const getCouponsDetailsInit = (id) => ({
  type: types.GET_COUPONS_DETAILS_INIT,
  id,
});

export const getCouponsDetailsSuccess = (details) => ({
  type: types.GET_COUPONS_DETAILS_SUCCESS,
  details,
});

export const addCouponInit = (values, closeModal) => ({
  type: types.ADD_COUPON_INIT,
  values,
  closeModal,
});

export const addCouponSuccess = () => ({
  type: types.ADD_COUPON_SUCCESS,
});

export const editCouponInit = (id, values, active, closeModal) => ({
  type: types.EDIT_COUPON_INIT,
  id,
  values,
  active,
  closeModal,
});

export const editCouponSuccess = () => ({
  type: types.EDIT_COUPON_SUCCESS,
});

export const disableCouponInit = (id, active) => ({
  type: types.DISABLE_COUPON_INIT,
  id,
  active,
});

export const disableCouponSuccess = () => ({
  type: types.DISABLE_COUPON_SUCCESS,
});

export const deleteCouponInit = (id) => ({
  type: types.DELETE_COUPON_INIT,
  id,
});

export const deleteCouponSuccess = () => ({
  type: types.DELETE_COUPON_SUCCESS,
});

export const couponsError = () => ({
  type: types.COUPONS_ERROR,
});
