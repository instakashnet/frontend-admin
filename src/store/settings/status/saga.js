import { put, all, takeEvery, fork, delay, call } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { exchangeInstance } from "../../../helpers/AuthType/axios";

function* getStatus() {
  try {
    const res = yield exchangeInstance.get("/status");
    if (res.status === 200) yield put(actions.getStatusSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* editStatus({ values, id, setState }) {
  try {
    const res = yield exchangeInstance.put(`/status/${id}`, values);
    if (res.status === 200) {
      yield put(actions.editStatusSuccess("Estado actualizado correctamente!"));
      yield put(actions.getStatus());
      yield call(setState, null);
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  } finally {
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

export function* watchEditStatus() {
  yield takeEvery(actionTypes.EDIT_STATUS, editStatus);
}

export function* watchGetStatus() {
  yield takeEvery(actionTypes.GET_STATUS, getStatus);
}

export default function* () {
  yield all([fork(watchGetStatus), fork(watchEditStatus)]);
}
