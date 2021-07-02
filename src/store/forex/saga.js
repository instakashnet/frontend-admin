import { fork, all, put, takeEvery, call, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { setAlert } from "../actions";
import { exchangeInstance } from "../../helpers/AuthType/axios";

function* getForex() {
  try {
    const res = yield exchangeInstance.get("/forex");
    yield put(actions.getForexSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getAllRates() {
  try {
    const res = yield exchangeInstance.get("/rates/all");
    yield put(actions.getAllRateSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getforexRates({ forexId }) {
  try {
    const res = yield exchangeInstance.get(`/rates/forex/${forexId}`);
    const ratesArray = res.data.map((rates) => ({
      ...rates,
      buy: +rates.buy,
      sell: +rates.sell,
    }));
    if (res.status === 200) yield put(actions.getForexRatesSuccess(ratesArray));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* addCurrencyPrice({ values }) {
  const ratesValues = {
    ...values,
    buy: values.buy.toFixed(3),
    sell: values.sell.toFixed(3),
  };

  try {
    const res = yield exchangeInstance.post("/rates", ratesValues);
    if (res.status === 201) {
      yield call(getforexRates, { forexId: values.forexId });
      yield call(getAllRates);
      yield put(setAlert("success", "Se ha actualizado el precio correctamente."));
      yield put(actions.addCurrencyPriceSuccess());
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
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
