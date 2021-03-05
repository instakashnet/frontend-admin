import { put, all, fork, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { exchangeInstance, authInstance } from "../../../helpers/AuthType/axios";

function* getClients() {
  try {
    const res = yield authInstance.get("/admin/users?type=client");
    if (res.status === 200) yield put(actions.getClientsSuccess(res.data.users));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getClientDetails({ userId }) {
  try {
    const res = yield authInstance.get(`/admin/users/${userId}`);
    if (res.status === 200) yield put(actions.getClientDetailsSuccess(res.data.user[0]));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getClientExchanges({ userId }) {
  try {
    const res = yield exchangeInstance(`/order/admin/user/${userId}`);
    if (res.status === 200) yield put(actions.getClientExchangesSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getClientActivity({ payload }) {
  // const { id } = payload;
  // try {
  //   const res = yield axios.get(`/Cliente/ObtenerTransacciones?IdUsuario=${id}`);
  //   if (res.status === 200) yield put(actions.getClientActivitySuccess(res.data));
  // } catch (error) {
  //   yield put(actions.apiError(error.message));
  // }
}

function* updateClient({ payload }) {
  // const { values, id } = payload;
  // const newValues = {
  //   ...values,
  //   dateBirth: values.dateBirth || null,
  //   id: +id,
  //   isDisabled: values.isDisabled === "true" ? true : false,
  // };
  // console.log(newValues);
  // try {
  //   const res = yield axios.post("/Cliente/EditarCliente", newValues);
  //   if (res.status === 200) {
  //     yield put(actions.updateClientSuccess("Usuario actualizado correctamente!"));
  //     yield put(actions.getClientDetails(+id));
  //   }
  // } catch (error) {
  //   yield put(actions.apiError(error.message));
  // } finally {
  //   yield delay(4000);
  //   yield put(actions.clearAlert());
  // }
}

export function* watchGetClients() {
  yield takeEvery(actionTypes.GET_CLIENTS_INIT, getClients);
}

export function* watchGetClientExchanges() {
  yield takeEvery(actionTypes.GET_CLIENT_EXCHANGES, getClientExchanges);
}

export function* watchGetClientActivity() {
  yield takeEvery(actionTypes.GET_CLIENT_ACTIVITY, getClientActivity);
}

export function* watchGetClientDetails() {
  yield takeEvery(actionTypes.GET_CLIENT_DETAILS, getClientDetails);
}

export function* watchUpdateClient() {
  yield takeEvery(actionTypes.UPDATE_CLIENT, updateClient);
}

export default function* clientsSaga() {
  yield all([fork(watchGetClientDetails), fork(watchUpdateClient), fork(watchGetClientActivity), fork(watchGetClientExchanges), fork(watchGetClients)]);
}
