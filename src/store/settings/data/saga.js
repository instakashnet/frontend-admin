import * as types from "./types";
import { put, fork, takeEvery, all } from "redux-saga/effects";
import * as actions from "./actions";
import { accountsInstance } from "../../../api/axios";

function* getCountries() {
  try {
    const res = yield accountsInstance.get("/countries");
    if (res.status === 200) yield put(actions.getCountriesSuccess(res.data.countries));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getCurrencies() {
  try {
    const res = yield accountsInstance.get("/currencies");
    if (res.status === 200) yield put(actions.getCurrenciesSuccess(res.data.currencies));
  } catch (error) {
    yield put(actions.apiError());
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
