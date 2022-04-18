import { all, fork, put, takeEvery } from "redux-saga/effects";
import { getAxiosInstance } from "../../../api/axios";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getCounters() {
  try {
    const res = yield getAxiosInstance("exchange", "v1").get("/order/data/today");
    if (res.status === 200) yield put(actions.getCountersSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getTotalKash() {
  try {
    const res = yield getAxiosInstance("accounts", "v1").get("/accounts/users/kash-total");
    if (res.status === 200) yield put(actions.getTotalKashSuccess(res.data.totalKashAcumulated));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export function* watchGetCounters() {
  yield takeEvery(actionTypes.GET_COUNTERS, getCounters);
}

export function* watchGetTotalKash() {
  yield takeEvery(actionTypes.GET_TOTAL_KASH_INIT, getTotalKash);
}

export default function* countersSaga() {
  yield all([fork(watchGetCounters), fork(watchGetTotalKash)]);
}
