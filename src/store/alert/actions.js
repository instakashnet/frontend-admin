import * as types from "./types";

export const setAlert = (color, msg) => ({
  type: types.SET_ALERT,
  color,
  msg,
});

export const removeAlert = () => ({
  type: types.REMOVE_ALERT,
});
