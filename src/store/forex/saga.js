import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { addCurrencyPriceSvc, getAllRatesSvc, getForexRatesSvc, getForexSvc } from "../../api/services/exchange.service";
import { setAlert } from "../actions";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getForex() {
  try {
    const res = yield call(getForexSvc);
    yield put(actions.getForexSuccess(res));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getAllRates() {
  try {
    const res = yield call(getAllRatesSvc);
    yield put(actions.getAllRateSuccess(res));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getforexRates({ forexId }) {
  try {
    const res = yield call(getForexRatesSvc, forexId);
    const ratesArray = res.map((rates) => ({
      ...rates,
      buy: +rates.buy,
      sell: +rates.sell,
    }));
    yield put(actions.getForexRatesSuccess(ratesArray));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* addCurrencyPrice({ values }) {
  const ratesValues = {
    ...values,
    buy: values.buy.toFixed(4),
    sell: values.sell.toFixed(4),
  };
  try {
    yield call(addCurrencyPriceSvc, ratesValues);
    yield call(getforexRates, { forexId: values.forexId });
    yield call(getAllRates);
    yield put(setAlert("success", "Se ha actualizado el precio correctamente."));
    yield put(actions.addCurrencyPriceSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
  }
}

export function* watchAddCurrencyPrice() {
  yield takeLatest(actionTypes.ADD_CURRENCY_PRICE_INIT, addCurrencyPrice);
}

export function* watchGetForex() {
  yield takeEvery(actionTypes.GET_FOREX_INIT, getForex);
}

export function* watchGetAllRates() {
  yield takeEvery(actionTypes.GET_ALL_RATES_INIT, getAllRates);
}

export function* watchGetForexRates() {
  yield takeEvery(actionTypes.GET_RATES_INIT, getforexRates);
}

export default function* forexSaga() {
  yield all([fork(watchAddCurrencyPrice), fork(watchGetForex), fork(watchGetAllRates), fork(watchGetForexRates)]);
}
