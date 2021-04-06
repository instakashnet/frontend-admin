import * as types from "./types";
const initialState = {
  countries: [],
  currencies: [],
  isLoading: true,
  error: "",
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_COUNTRIES_SUCCESS:
      return { ...state, countries: action.countries };

    case types.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.currencies };

    default:
      return state;
  }
}
