import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getAdvanceBarChartSvc, getCurrencyBarChartSvc, getUsersChartSvc } from "../../api/services/exchange.service";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getCurrencyBarChart({ chartType }) {
  try {
    const res = yield call(getCurrencyBarChartSvc, chartType);
    yield put(actions.getCurrencyBarChartSuccess(res));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getAdvanceBarChart() {
  try {
    const res = yield call(getAdvanceBarChartSvc);
    yield put(actions.getAdvanceBarChartSuccess(res));
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* getUsersChart() {
  try {
    const res = yield call(getUsersChartSvc);
    yield put(actions.getUsersChartSuccess(res));
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
