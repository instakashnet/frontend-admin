import * as types from "./types";

const initialState = {
  admins: [],
  operators: [],
  isLoading: true,
  isProcessing: false,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ADMINS.INIT:
    case types.GET_OPERATORS.INIT:
      return { ...state, isLoading: true };
    case types.GET_ADMINS.SUCCESS:
      return { ...state, admins: action.admins, isLoading: false };
    case types.GET_ADMINS.ERROR:
      return { ...state, admins: [], isLoading: false };
    case types.GET_OPERATORS.SUCCESS:
      return { ...state, operators: action.operators, isLoading: false };
    case types.GET_OPERATORS.ERROR:
      return { ...state, operators: [], isLoading: false };
    case types.SET_ONLINE.INIT:
      return { ...state, isProcessing: true };
    case types.SET_ONLINE.SUCCESS:
    case types.SET_ONLINE.ERROR:
      return { ...state, isProcessing: false };
    default:
      return state;
  }
};

export default usersReducer;
