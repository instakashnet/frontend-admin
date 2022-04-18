import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getAxiosInstance } from "../../../api/axios";
import { setAlert } from "../../actions";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getSchedule() {
  try {
    const res = yield getAxiosInstance("exchange", "v1").get("/schedules");
    if (res.status === 200) yield put(actions.getScheduleSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
    yield put(setAlert("danger", error.message));
  }
}

function* editSchedule({ values, id, setState }) {
  try {
    const res = yield getAxiosInstance("exchange", "v1").put(`/schedules/${id}`, values);
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
