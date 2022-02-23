import { put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as types from "./types";
import { exchangeInstance } from "../../../helpers/AuthType/axios";

function* getRevenue({ rate }) {
  try {
    const res = yield exchangeInstance.get(`/order/revenue?priceMarket=${rate}`);
    if (res.status === 200) yield put(actions.getRevenueSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

export function* revenueSaga() {
  yield takeEvery(types.GET_REVENUE_INIT, getRevenue);
}
