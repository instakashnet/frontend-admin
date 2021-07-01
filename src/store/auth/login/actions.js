import * as actionTypes from "./actionTypes";

export const loadUser = (history) => ({
  type: actionTypes.LOAD_USER,
  history,
});

export const loadUserError = () => ({
  type: actionTypes.LOAD_USER_FAILED,
});

export const loginUser = (user, history) => ({
  type: actionTypes.LOGIN_USER,
  payload: { user, history },
});

export const loginSuccess = (user, token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: { user, token },
  };
};

export const logoutUser = (history) => ({
  type: actionTypes.LOGOUT_USER,
  payload: { history },
});

export const logoutUserSuccess = () => {
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = () => {
  return {
    type: actionTypes.API_ERROR,
  };
};
