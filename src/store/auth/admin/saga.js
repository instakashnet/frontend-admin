import * as types from "./types";
import * as actions from "./actions";
import { all, fork, put, takeEvery } from "redux-saga/effects";
import { authInstance } from "../../../helpers/AuthType/axios";

function* getOperators() {
  try {
    const res = yield authInstance.get("/admin/operators");
    if (res.status === 200) yield put(actions.getOperatorsSuccess(res.data.result));
  } catch (error) {
    yield put(actions.usersError("No se pudo obtener la lista de operadores. Intenta de nuevo o contacta a soporte."));
  }
}

export function* watchGetOperators() {
  yield takeEvery(types.GET_OPERATORS_INIT, getOperators);
}

export default function* usersSaga() {
  yield all([fork(watchGetOperators)]);
}
