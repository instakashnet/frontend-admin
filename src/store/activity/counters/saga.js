import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getTotalKashSvc } from "../../../api/services/accounts.service";
import { getCountersSvc } from "../../../api/services/exchange.service";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getCounters() {
  try {
    const res = yield call(getCountersSvc);
    yield put(actions.getCountersSuccess(res));

  } catch (error) {
    yield put(actions.apiError(error?.message));
  }
}

function* getTotalKash() {
  try {
    const res = yield call(getTotalKashSvc);
    yield put(actions.getTotalKashSuccess(res));

  } catch (error) {
    yield put(actions.apiError(error?.message));
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
