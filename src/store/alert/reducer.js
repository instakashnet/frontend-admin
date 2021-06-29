import * as types from "./types";
const initialState = {
  show: false,
  msg: null,
  color: null,
};

const alertReducer = (state = initialState, action) => {
  if (action.type === types.SET_ALERT) return { show: true, msg: action.msg, color: action.color };
  if (action.type === types.REMOVE_ALERT) return initialState;
  return state;
};

export default alertReducer;
