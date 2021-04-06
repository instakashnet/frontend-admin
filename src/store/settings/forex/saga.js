import { fork, all, put, takeEvery, call, delay, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { exchangeInstance } from "../../../helpers/AuthType/axios";

function* getForex() {
  try {
    const res = yield exchangeInstance.get("/forex/admin");
    yield put(actions.getForexSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getAllRates() {
  try {
    const res = yield exchangeInstance.get("/rates/admin/all");
    yield put(actions.getAllRateSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getforexRates({ forexId }) {
  try {
    const res = yield exchangeInstance.get(`/rates/admin/forex/${forexId}`);
    if (res.status === 200) yield put(actions.getForexRatesSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* addCurrencyPrice({ values }) {
  try {
    const res = yield exchangeInstance.post("/rates/admin", values);
    if (res.status === 201) {
      yield call(getforexRates, { forexId: values.forexId });
      yield call(getAllRates);
      yield put(actions.addCurrencyPriceSuccess("Precio actualizado correctamente!"));
      yield delay(4000);
      yield put(actions.clearAlert());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.apiError("Ha ocurrido un problema actualizando la tasa. Por favor intente de nuevo o contacte a soporte."));
    yield delay(4000);
    yield put(actions.clearAlert());
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
