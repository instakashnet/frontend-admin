import * as actionTypes from "./actionTypes";

const initialState = {
  user: null,
  role: null,
  token: null,
  isSignedIn: false,
  isLoading: false,
  isProcessing: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER:
    case actionTypes.REFRESH_TOKEN.INIT:
      return { ...state, isLoading: true };
    case actionTypes.LOAD_USER_SUCCESS:
      return { ...state, user: action.user, isSignedIn: true, isLoading: false };
    case actionTypes.REFRESH_TOKEN.SUCCESS:
      return { ...state, token: action.token, isLoading: false };

    case actionTypes.LOGIN_USER:
    case actionTypes.SET_ONLINE_INIT:
      return { ...state, isProcessing: true };
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, token: action.token, isProcessing: false };
    case actionTypes.LOGOUT_USER_SUCCESS:
      return { ...state, isLoading: false, isSignedIn: false, user: null, token: null };

    case actionTypes.SET_ONLINE_SUCCESS:
      return { ...state, user: action.user, isLoading: false };

    case actionTypes.API_ERROR:
      return { ...state, isLoading: false, isProcessing: false };
    default:
      return state;
  }
};

export default login;
