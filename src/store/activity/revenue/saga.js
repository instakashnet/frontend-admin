import { call, put, takeEvery } from "redux-saga/effects";
import { getRevenueSvc } from "../../../api/services/exchange.service";
import * as actions from "./actions";
import * as types from "./types";

function* getRevenue({ rate }) {
  try {
    const res = yield call(getRevenueSvc, rate);
    yield put(actions.getRevenueSuccess(res));
  } catch (error) {
    yield put(actions.apiError());
  }
}

export function* revenueSaga() {
  yield takeEvery(types.GET_REVENUE_INIT, getRevenue);
}
