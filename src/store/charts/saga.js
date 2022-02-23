import { all, fork, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { exchangeInstance } from "../../helpers/AuthType/axios";

function* getCurrencyBarChart({ chartType }) {
  try {
    const res = yield exchangeInstance.get(`/order/data/orders?type=${chartType}`);
    if (res.status === 200) yield put(actions.getCurrencyBarChartSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getAdvanceBarChart() {
  // try {
  //   const res = yield axios.get("Estadisticas/GraficosAE");
  //   if (res.status === 200) yield put(actions.getAdvanceBarChartSuccess(res.data));
  // } catch (error) {
  //   yield put(actions.apiError());
  // }
}

function* getUsersChart() {
  try {
    const res = yield exchangeInstance.get("/order/data/users");
    if (res.status === 200) yield put(actions.getUsersChartSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export function* watchGetCurrencyBarChart() {
  yield takeEvery(actionTypes.GET_CURRENCY_BAR_CHART, getCurrencyBarChart);
}

export function* watchGetAdvanceBarChart() {
  yield takeEvery(actionTypes.GET_ADVANCE_BAR_CHART, getAdvanceBarChart);
}

export function* watchGetUsersChart() {
  yield takeEvery(actionTypes.GET_USERS_CHART, getUsersChart);
}

export default function* chartsSaga() {
  yield all([fork(watchGetCurrencyBarChart), fork(watchGetAdvanceBarChart), fork(watchGetUsersChart)]);
}
