import { put, all, fork, takeEvery, call } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { setAlert } from "../../actions";
import { exchangeInstance } from "../../../helpers/AuthType/axios";

function* getSchedule() {
  try {
    const res = yield exchangeInstance.get("/schedules");
    if (res.status === 200) yield put(actions.getScheduleSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
    yield put(setAlert("danger", error.message));
  }
}

function* editSchedule({ values, id, setState }) {
  try {
    const res = yield exchangeInstance.put(`/schedules/${id}`, values);
    if (res.status === 200) {
      yield put(actions.getSchedule());
      yield call(setState, false);
      yield put(setAlert("success", "Horario actualizado correctamente."));
      yield put(actions.editScheduleSuccess());
    }
  } catch (error) {
    yield put(actions.apiError());
    yield put(setAlert("danger", error.message));
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
