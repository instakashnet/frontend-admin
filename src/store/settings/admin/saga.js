import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getAdminsWorkerSvc, getOperatorsWorkerSvc, setOperatorOnlineSvc } from "../../../api/services/auth.service";
import { getOpenedStatusSvc, updateOpenedStatusSvc } from "../../../api/services/exchange.service";
import * as actions from "./actions";
import * as types from "./types";

function* getAdminsWorker() {
  try {
    const res = yield call(getAdminsWorkerSvc);
    yield put(actions.getAdminsSuccess(res));
  } catch (error) {
    yield put(actions.getAdminsError());
  }
}

function* getOperatorsWorker({ online }) {
  try {
    const res = yield call(getOperatorsWorkerSvc, online);
    yield put(actions.getOperatorsSuccess(res));
  } catch (error) {
    yield put(actions.getOperatorsError());
  }
}

function* setOperatorOnline({ userId }) {
  try {
    yield call(setOperatorOnlineSvc, userId);
    yield put(actions.getOperatorsInit());
  } catch (error) {
    yield put(actions.setOperatorOnlineError());
  }
}

function* getOpenedStatusWorker() {
  try {
    const res = yield getOpenedStatusSvc();

    yield put(actions.getOpenedStatusSuccess(res.isOpen));
  } catch (error) {
    yield put(actions.getOpenedStatusError());
  }
}

function* updateOpenedStatusWorker({ status }) {
  try {
    const res = yield updateOpenedStatusSvc({ open: status });

    yield put(actions.updateOpenedStatusSuccess(res.value));
  } catch (error) {
    yield put(actions.getOpenedStatusError());
  }
}

export function* adminsSaga() {
  yield all([
    yield takeEvery(types.GET_ADMINS.INIT, getAdminsWorker),
    yield takeEvery(types.GET_OPERATORS.INIT, getOperatorsWorker),
    yield takeEvery(types.SET_ONLINE.INIT, setOperatorOnline),
    yield takeEvery(types.GET_OPENED_STATUS.INIT, getOpenedStatusWorker),
    yield takeLatest(types.UPDATE_OPENED_STATUS.INIT, updateOpenedStatusWorker),
  ]);
}
