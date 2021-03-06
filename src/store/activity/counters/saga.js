import { put, all, fork, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { exchangeInstance } from "../../../helpers/AuthType/axios";

function* getCounters() {
  try {
    const res = yield exchangeInstance.get("/order/admin/data/today");
    if (res.status === 200) yield put(actions.getCountersSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export function* watchGetCounters() {
  yield takeEvery(actionTypes.GET_COUNTERS, getCounters);
}

export default function* countersSaga() {
  yield all([fork(watchGetCounters)]);
}
