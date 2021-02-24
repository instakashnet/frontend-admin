import * as actionTypes from "./actionTypes";
const initialState = {
  error: "",
  clientBinnacle: [],
  adminBinnacle: [],
  isLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_CLIENT_BINNACLE_SUCCESS:
      return { ...state, clientBinnacle: payload.activity, isLoading: false };
    case actionTypes.GET_ADMIN_BINNACLE_SUCCESS:
      return { ...state, adminBinnacle: payload.activity, isLoading: false };

    default:
      return state;
  }
}
