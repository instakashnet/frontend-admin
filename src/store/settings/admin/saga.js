import * as types from "./types";
import * as actions from "./actions";
import { all, put, takeEvery } from "redux-saga/effects";
import { authInstance } from "../../../api/axios";

function* getAdminsWorker() {
  try {
    const res = yield authInstance.get("/users/admins");
    if (res.status === 200) yield put(actions.getAdminsSuccess(res.data.admins));
  } catch (error) {
    yield put(actions.getAdminsError());
  }
}

function* getOperatorsWorker() {
  try {
    const res = yield authInstance.get("/users/operators");
    if (res.status === 200) yield put(actions.getOperatorsSuccess(res.data.result));
  } catch (error) {
    yield put(actions.getOperatorsError());
  }
}

function* setAdminOnline({ userId }) {
  try {
    const res = yield authInstance.put(`/auth/online/${userId}`);
    if (res.status === 200) yield put(actions.getAdminsInit());
  } catch (error) {
    yield put(actions.setAdminOnlineError());
  }
}

export function* adminsSaga() {
  yield all([
    yield takeEvery(types.GET_ADMINS.INIT, getAdminsWorker),
    yield takeEvery(types.GET_OPERATORS.INIT, getOperatorsWorker),
    yield takeEvery(types.SET_ONLINE.INIT, setAdminOnline),
  ]);
}
