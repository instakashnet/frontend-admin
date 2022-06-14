import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { editScheduleSvc, getScheduleSvc } from "../../../api/services/exchange.service";
import { setAlert } from "../../actions";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getSchedule() {
  try {
    const res = yield call(getScheduleSvc);
    yield put(actions.getScheduleSuccess(res));
  } catch (error) {
    yield put(actions.apiError());
    if (error.message) yield put(setAlert("danger", error.message));
  }
}

function* editSchedule({ values, id, setState }) {
  try {
    yield call(editScheduleSvc, id, values);
    yield put(actions.getSchedule());
    yield call(setState, false);
    yield put(setAlert("success", "Horario actualizado correctamente."));
    yield put(actions.editScheduleSuccess());
  } catch (error) {
    yield put(actions.apiError());
    if (error.message) yield put(setAlert("danger", error.message));
  }
}

export function* watchGetSchedule() {
  yield takeEvery(actionTypes.GET_SCHEDULE, getSchedule);
}

export function* watchEditSchedule() {
  yield takeEvery(actionTypes.EDIT_SCHEDULE, editSchedule);
}

export default function* scheduleSaga() {
  yield all([fork(watchGetSchedule), fork(watchEditSchedule)]);
}
