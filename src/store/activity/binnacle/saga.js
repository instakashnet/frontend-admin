import { all, takeEvery, fork } from "redux-saga/effects";
// import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getClientBinnacle() {
  // try {
  //   const res = yield axios.get("/Bitacoras/ObtenerBitacoraCliente");
  //   if (res.status === 200) yield put(actions.getClientBinnacleSuccess(res.data));
  // } catch (error) {
  //   yield put(actions.apiError(error.message));
  // }
}

function* getAdminBinnacle() {
  // try {
  //   const res = yield axios.get("/Bitacoras/ObtenerBitacoraAdmin");
  //   if (res.status === 200) yield put(actions.getAdminBinnacleSuccess(res.data));
  // } catch (error) {
  //   yield put(actions.apiError(error.message));
  // }
}

export function* watchGetClientBinnacle() {
  yield takeEvery(actionTypes.GET_CLIENT_BINNACLE, getClientBinnacle);
}

export function* watchGetAdminBinnacle() {
  yield takeEvery(actionTypes.GET_ADMIN_BINNACLE, getAdminBinnacle);
}

export default function* binnacleSaga() {
  yield all([fork(watchGetClientBinnacle), fork(watchGetAdminBinnacle)]);
}
