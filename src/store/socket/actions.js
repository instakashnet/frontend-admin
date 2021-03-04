import * as types from "./types";

export const joinGroup = (token) => ({
  type: types.JOIN_GROUP,
  token,
});

export const changeOrderState = (token, orderId) => ({
  type: types.CHANGE_ORDER_STATE,
  token,
  orderId,
});
