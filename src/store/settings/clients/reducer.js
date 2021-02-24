import * as actionTypes from "./actionTypes";
const initialState = {
  clients: [],
  details: null,
  activity: {},
  exchanges: [],
  error: "",
  success: "",
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CLIENTS_SUCCESS:
      return { ...state, clients: action.clients };

    case actionTypes.GET_CLIENT_DETAILS_SUCCESS:
      return { ...state, details: payload.data, isLoading: false };

    case actionTypes.GET_CLIENT_EXCHANGES_SUCCESS:
      return { ...state, exchanges: action.orders, isLoading: false };

    case actionTypes.GET_CLIENT_ACTIVITY:
      return { ...state, isLoading: true };
    case actionTypes.GET_CLIENT_ACTIVITY_SUCCESS:
      return { ...state, activity: payload.data, isLoading: false };

    case actionTypes.UPDATE_CLIENT_SUCCESS:
      return { ...state, success: payload };

    case actionTypes.CLEAR_ALERT:
      return { ...state, success: "", error: "" };

    case actionTypes.API_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
}
