import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { editStatusSvc, getStatusSvc } from "../../../api/services/exchange.service";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getStatus() {
  try {
    const res = yield call(getStatusSvc);
    yield put(actions.getStatusSuccess(res));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* editStatus({ values, id, setState }) {
  try {
    yield call(editStatusSvc, id, values);
    yield put(actions.editStatusSuccess("¡Estado actualizado correctamente!"));
    yield put(actions.getStatus());
    yield call(setState, null);
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
