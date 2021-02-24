import * as actionTypes from "./actionTypes";

const initialState = {
  user: null,
  token: null,
  error: "",
  isLoading: false,
  isProcessing: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER:
      return { ...state, isLoading: true };

    case actionTypes.LOGIN_USER:
      return { ...state, isProcessing: true };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isProcessing: false,
      };
    case actionTypes.LOGOUT_USER:
      return { ...state };
    case actionTypes.LOGOUT_USER_SUCCESS:
      return { ...state, isLoading: false, user: null, token: null };

    case actionTypes.LOAD_USER_FAILED:
      return { ...state, isLoading: false };
    case actionTypes.API_ERROR:
      return { ...state, error: action.payload, isLoading: false, isProcessing: false };
    case actionTypes.CLEAR_ALERT:
      return { ...state, error: "" };
    default:
      return state;
  }
};

export default login;
