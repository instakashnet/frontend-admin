import * as types from './types';

const initialState = {
  operators: [],
  isLoading: true,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_OPERATORS_SUCCESS:
      return { ...state, operators: action.operators, isLoading: false };
    case types.USERS_ERROR:
      return { ...state, error: action.msg, isLoading: false };
    default:
      return state;
  }
};

export default usersReducer;
