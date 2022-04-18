import { all, fork, put, takeEvery } from "redux-saga/effects";
import { getAxiosInstance } from "../../../api/axios";
import * as actions from "./actions";
import * as types from "./types";

function* getCountries() {
  try {
    const res = yield getAxiosInstance("accounts", "v1").get("/countries");
    if (res.status === 200) yield put(actions.getCountriesSuccess(res.data.countries));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getCurrencies() {
  try {
    const res = yield getAxiosInstance("accounts", "v1").get("/currencies");
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
