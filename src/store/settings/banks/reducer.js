import * as actionTypes from "./actionTypes";

const initialState = {
  banks: [],
  bankData: null,
  isLoading: true,
  isProcessing: false,
};

export default function banksReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_BANKS:
      return { ...state, isLoading: true };

    case actionTypes.GET_BANKS_SUCCESS:
      return { ...state, banks: payload.banks, isLoading: false };

    case actionTypes.ADD_BANK:
    case actionTypes.EDIT_BANK:
    case actionTypes.TOGGLE_BANK:
      return { ...state, isProcessing: true };

    case actionTypes.ADD_BANK_SUCCESS:
    case actionTypes.EDIT_BANK_SUCCESS:
    case actionTypes.TOGGLE_BANK_SUCCESS:
      return { ...state, isProcessing: false };

    case actionTypes.API_ERROR:
      return { ...state, isLoading: false, isProcessing: false };
    default:
      return state;
  }
}
