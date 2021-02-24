import * as types from "./actionTypes";

const initialState = {
  users: [],
  roles: [],
  error: "",
  success: "",
  isLoading: true,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ROLES_SUCCESS:
      return (state = { ...state, roles: action.payload });
    case types.GET_USERS_SUCCESS:
      return (state = { ...state, users: action.payload });
    case types.ADD_USER_SUCCESS:
    case types.EDIT_USER_SUCCESS:
      return (state = { ...state, success: action.payload });
    case types.API_ERROR:
      return (state = { ...state, error: action.payload });
    case types.CLEAR_ALERT:
      return (state = { ...state, error: "", success: "" });
    default:
      return (state = { ...state });
  }
};

export default profile;
