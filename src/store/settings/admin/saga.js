import { all, put, takeEvery } from "redux-saga/effects";
import { getAxiosInstance } from "../../../api/axios";
import * as actions from "./actions";
import * as types from "./types";

function* getAdminsWorker() {
  try {
    const res = yield getAxiosInstance("auth", "v1").get("/users/admins");
    if (res.status === 200) yield put(actions.getAdminsSuccess(res.data.admins));
  } catch (error) {
    yield put(actions.getAdminsError());
  }
}

function* getOperatorsWorker({ online }) {
  try {
    const res = yield getAxiosInstance("auth", "v1").get(`/users/operators${online ? "?online=true" : ""}`);
    if (res.status === 200) yield put(actions.getOperatorsSuccess(res.data.admins));
  } catch (error) {
    yield put(actions.getOperatorsError());
  }
}

function* setOperatorOnline({ userId }) {
  try {
    const res = yield getAxiosInstance("auth", "v1").put(`/auth/online/${userId}`);
    if (res.status === 200) yield put(actions.getOperatorsInit());
  } catch (error) {
    yield put(actions.setOperatorOnlineError());
  }
}

export function* adminsSaga() {
  yield all([
    yield takeEvery(types.GET_ADMINS.INIT, getAdminsWorker),
    yield takeEvery(types.GET_OPERATORS.INIT, getOperatorsWorker),
    yield takeEvery(types.SET_ONLINE.INIT, setOperatorOnline),
  ]);
}
