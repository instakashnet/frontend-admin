import * as types from "./types";
import { put, fork, takeEvery, all } from "redux-saga/effects";
import * as actions from "./actions";
import { accountsInstance } from "../../../helpers/AuthType/axios";

function* getCountries() {
  try {
    const res = yield accountsInstance.get("/admin/countries");
    if (res.status === 200) yield put(actions.getCountriesSuccess(res.data.countries));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getCurrencies() {
  try {
    const res = yield accountsInstance.get("/admin/currencies");
    if (res.status === 200) yield put(actions.getCurrenciesSuccess(res.data.currencies));
  } catch (error) {
    console.log(error);
    yield put(actions.apiError(error.message));
  }
}

export function* watchGetCountries() {
  yield takeEvery(types.GET_COUNTRIES_INIT, getCountries);
}

export function* watchGetCurrencies() {
  yield takeEvery(types.GET_CURRENCIES_INIT, getCurrencies);
}

export default function* dataSaga() {
  yield all([fork(watchGetCountries), fork(watchGetCurrencies)]);
}
