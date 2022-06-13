import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCountriesSvc, getCurrenciesSvc } from "../../../api/services/accounts.service";
import * as actions from "./actions";
import * as types from "./types";

function* getCountries() {
  try {
    const res = yield call(getCountriesSvc);
    yield put(actions.getCountriesSuccess(res));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getCurrencies() {
  try {
    const res = yield call(getCurrenciesSvc);
    yield put(actions.getCurrenciesSuccess(res));
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
