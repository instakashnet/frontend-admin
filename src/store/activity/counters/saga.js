import { put, all, fork, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { exchangeInstance, accountsInstance } from "../../../api/axios";

function* getCounters() {
  try {
    const res = yield exchangeInstance.get("/order/data/today");
    if (res.status === 200) yield put(actions.getCountersSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getTotalKash() {
  try {
    const res = yield accountsInstance.get("/accounts/users/kash-total");
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
