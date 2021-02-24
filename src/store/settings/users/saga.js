import { takeEvery, fork, put, all } from "redux-saga/effects";
// import Swal from "sweetalert2";
import * as types from "./actionTypes";
import * as actions from "./actions";
import { authInstance } from "../../../helpers/AuthType/axios";

function* getAdminUsers() {
  try {
    const res = yield authInstance.get("/admin/users?type=admin");
    if (res.status === 200) yield put(actions.getUsersSuccess(res.data.users));
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error obteniendo los usuarios. Por fvor contacte a soporte."));
  }
}
export function* watchGetAdminUsers() {
  yield takeEvery(types.GET_USERS, getAdminUsers);
}

function* ProfileSaga() {
  yield all([fork(watchGetAdminUsers)]);
}

export default ProfileSaga;
