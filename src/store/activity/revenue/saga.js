import { put, takeEvery } from "redux-saga/effects";
import { getAxiosInstance } from "../../../api/axios";
import * as actions from "./actions";
import * as types from "./types";

function* getRevenue({ rate }) {
  try {
    const res = yield getAxiosInstance("exchange", "v1").get(`/order/revenue?priceMarket=${rate}`);
    if (res.status === 200) yield put(actions.getRevenueSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

export function* revenueSaga() {
  yield takeEvery(types.GET_REVENUE_INIT, getRevenue);
}
