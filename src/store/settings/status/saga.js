import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getAxiosInstance } from "../../../api/axios";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getStatus() {
  try {
    const res = yield getAxiosInstance("exchange", "v1").get("/status");
    if (res.status === 200) yield put(actions.getStatusSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* editStatus({ values, id, setState }) {
  try {
    const res = yield getAxiosInstance("exchange", "v1").put(`/status/${id}`, values);
    if (res.status === 200) {
      yield put(actions.editStatusSuccess("Estado actualizado correctamente!"));
      yield put(actions.getStatus());
      yield call(setState, null);
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export function* watchEditStatus() {
  yield takeEvery(actionTypes.EDIT_STATUS, editStatus);
}

export function* watchGetStatus() {
  yield takeEvery(actionTypes.GET_STATUS, getStatus);
}

export default function* statusSaga() {
  yield all([fork(watchGetStatus), fork(watchEditStatus)]);
}
