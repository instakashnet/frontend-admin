import { put, all, fork, takeEvery, takeLatest, call, delay } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import Swal from "sweetalert2";
import fileDownload from "js-file-download";
import { exchangeInstance, authInstance, accountsInstance } from "../../../helpers/AuthType/axios";
import { getExchangeDetails } from "../../transactions/currencyExchange/actions";
import { getWithdrawalDetailsInit } from "../../transactions/withdrawals/actions";

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
    if (res.status === 200) yield put(actions.getClientDetailsSuccess(res.data.user));
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield delay(4000);
  }
}

function* getClientExchanges({ userId }) {
  try {
    const res = yield exchangeInstance.get(`/order/admin/user/${userId}`);
    if (res.status === 200) yield put(actions.getClientExchangesSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* addClientProfile({ values, closeModal }) {
  try {
    const res = yield authInstance.post(`/admin/users/profiles`, values);
    if (res.status === 200) {
      yield put(actions.addProfileSuccess());
      yield call(closeModal);
      yield call(getClientDetails, { userId: values.userId });
      yield Swal.fire("Exitoso", "El perfil fue agregado correctamente.", "success");
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* editClientInfo({ userId, values, closeModal }) {
  try {
    const res = yield authInstance.put(`/admin/user/${userId}`, values);
    if (res.status === 200) {
      yield put(actions.editClientInfoSuccess());
      yield call(closeModal);
      yield call(getClientDetails, { userId });
      yield Swal.fire("Exitoso", "Los datos del usuario fueron editados correctamente.", "success");
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* editClientProfile({ values, closeModal }) {
  try {
    const res = yield authInstance.put("/admin/users/profiles", values);
    if (res.status === 200) {
      yield put(actions.editProfileSuccess());
      yield call(closeModal);
      yield call(getClientDetails, { userId: values.userId });
      yield Swal.fire("Exitoso", "Los datos del perfil fueron editados correctamente.", "success");
    }
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error editando los datos del perfil. Por favor contacta a soporte."));
  }
}

function* getClientAccounts({ id }) {
  try {
    const res = yield accountsInstance.get(`/admin/accounts/${id}`);
    yield put(actions.getClientAccountsSuccess(res.data.accounts));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* downloadClients({ fileType }) {
  let URL;

  if (fileType === "companies") URL = "/users/admin/companies/download";
  if (fileType === "clients") URL = "/users/admin/clients/download";

  try {
    if (!URL) return;
    const res = yield authInstance.get(URL, { responseType: "arraybuffer" });
    fileDownload(res.data, `${fileType}.xlsx`);
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* editInterplaza({ values, detailsType, id, setState }) {
  try {
    const res = yield accountsInstance.put(`/admin/accounts/${values.accountId}`, { interbank: values.interbank });
    if (res.status === 200) {
      if (detailsType === "exchange") yield put(getExchangeDetails(id));
      if (detailsType === "withdrawal") yield put(getWithdrawalDetailsInit(id));
      yield call(setState, false);
      yield Swal.fire("Exitoso", `Ceunta editada correctamente.`, "success");
      yield put(actions.editInterplazaSuccess());
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* disableClient({ userId, active }) {
  try {
    const result = yield Swal.fire({
      icon: "warning",
      title: `¿Desea ${active ? "deshabilitar" : "habilitar"} a este usuario?`,
      showCancelButton: true,
      cancelButtonText: "Regresar",
      cancelButtonColor: "#d9534f",
      confirmButtonText: "Si, continuar",
    });

    if (result.isConfirmed) {
      const res = yield authInstance.put("/admin/users/access", { userId, active: !active });
      if (res.status === 200) {
        yield put(actions.disableClientSuccess());
        yield call(getClientDetails, { userId });
        yield Swal.fire("Exitoso", `Usuario ${active ? "deshabilitado" : "habilitado"}.`, "success");
      }
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export function* watchGetClients() {
  yield takeEvery(actionTypes.GET_CLIENTS_INIT, getClients);
}

export function* watchGetClientExchanges() {
  yield takeEvery(actionTypes.GET_CLIENT_EXCHANGES, getClientExchanges);
}

export function* watchGetClientActivity() {
  yield takeEvery(actionTypes.GET_CLIENT_ACCOUNTS, getClientAccounts);
}

export function* watchGetClientDetails() {
  yield takeEvery(actionTypes.GET_CLIENT_DETAILS, getClientDetails);
}

export function* watchAddClientProfile() {
  yield takeEvery(actionTypes.ADD_PROFILE_INIT, addClientProfile);
}

export function* watchEditClientInfo() {
  yield takeLatest(actionTypes.EDIT_INFO_INIT, editClientInfo);
}

export function* watchEditClientProfile() {
  yield takeEvery(actionTypes.EDIT_PROFILE_INIT, editClientProfile);
}

export function* watchDownloadClients() {
  yield takeEvery(actionTypes.DOWNLOAD_CLIENTS_INIT, downloadClients);
}

export function* watchEditInterplaza() {
  yield takeLatest(actionTypes.EDIT_INTERPLAZA_INIT, editInterplaza);
}

export function* watchDisableClient() {
  yield takeLatest(actionTypes.DISABLE_CLIENT_INIT, disableClient);
}

export default function* clientsSaga() {
  yield all([
    fork(watchGetClientDetails),
    fork(watchAddClientProfile),
    fork(watchEditClientProfile),
    fork(watchEditClientInfo),
    fork(watchGetClientActivity),
    fork(watchGetClientExchanges),
    fork(watchGetClients),
    fork(watchDownloadClients),
    fork(watchEditInterplaza),
    fork(watchDisableClient),
  ]);
}
