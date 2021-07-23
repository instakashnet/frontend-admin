import { put, all, fork, takeEvery, takeLatest, call } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { setAlert } from "../../actions";
import Swal from "sweetalert2";
import fileDownload from "js-file-download";
import { exchangeInstance, authInstance, accountsInstance } from "../../../helpers/AuthType/axios";
import { getExchangeDetails } from "../../transactions/currencyExchange/actions";
import { getWithdrawalDetailsInit } from "../../transactions/withdrawals/actions";

function* getClientDetails({ userId }) {
  try {
    const res = yield authInstance.get(`/users/user/${userId}`);
    if (res.status === 200) yield put(actions.getClientDetailsSuccess(res.data.user));
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* getClientExchanges({ userId }) {
  try {
    const res = yield exchangeInstance.get(`/order/user/${userId}`);
    if (res.status === 200) yield put(actions.getClientExchangesSuccess(res.data));
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* addClientProfile({ values, closeModal }) {
  try {
    const res = yield authInstance.post(`/users/profiles`, values);
    if (res.status === 200) {
      yield put(actions.addProfileSuccess());
      yield call(closeModal);
      yield call(getClientDetails, { userId: values.userId });
      yield Swal.fire("Exitoso", "El perfil fue agregado correctamente.", "success");
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editClientInfo({ userId, values, closeModal }) {
  const profileValues = {
    ...values,
    phone: values.phone.replace("+", ""),
  };

  try {
    const res = yield authInstance.put(`/users/user/${userId}`, profileValues);
    if (res.status === 200) {
      yield put(actions.editClientInfoSuccess());
      yield call(closeModal);
      yield call(getClientDetails, { userId });
      yield Swal.fire("Exitoso", "Los datos del usuario fueron editados correctamente.", "success");
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editClientProfile({ values, closeModal }) {
  try {
    const res = yield authInstance.put("/users/profiles", values);
    if (res.status === 200) {
      yield put(actions.editProfileSuccess());
      yield call(closeModal);
      yield call(getClientDetails, { userId: values.userId });
      yield Swal.fire("Exitoso", "Los datos del perfil fueron editados correctamente.", "success");
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* uploadDocument({ values, userId, uploadType, close }) {
  let URL = `/users/${uploadType === "identity_photo" ? "upload-identity-photo" : "upload-identity-photo-two"}/${userId}`;

  try {
    const res = yield authInstance.post(URL, values);
    console.log(res);
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* getClientAccounts({ id }) {
  try {
    const res = yield accountsInstance.get(`/accounts/${id}`);
    yield put(actions.getClientAccountsSuccess(res.data.accounts));
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* downloadClients({ fileType }) {
  let URL;

  if (fileType === "companies") URL = "/users/companies/download";
  if (fileType === "clients") URL = "/users/clients/download";

  try {
    if (!URL) return;
    const res = yield authInstance.get(URL, { responseType: "arraybuffer" });
    fileDownload(res.data, `${fileType}.xlsx`);
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editInterplaza({ values, detailsType, id, setState }) {
  try {
    const res = yield accountsInstance.put(`/accounts/${values.accountId}`, { interbank: values.interbank });
    if (res.status === 200) {
      if (detailsType === "exchange") yield put(getExchangeDetails(id));
      if (detailsType === "withdrawal") yield put(getWithdrawalDetailsInit(id));
      yield call(setState, false);
      yield Swal.fire("Exitoso", `Ceunta editada correctamente.`, "success");
      yield put(actions.editInterplazaSuccess());
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
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
      const res = yield authInstance.put("/users/access", { userId, active: !active });
      if (res.status === 200) {
        yield put(actions.disableClientSuccess());
        yield call(getClientDetails, { userId });
        yield Swal.fire("Exitoso", `Usuario ${active ? "deshabilitado" : "habilitado"}.`, "success");
      }
    } else yield put(actions.apiError());
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
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

export function* watchUploadDocument() {
  yield takeLatest(actionTypes.UPLOAD_DOCUMENT_INIT, uploadDocument);
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
    fork(watchUploadDocument),
    fork(watchGetClientActivity),
    fork(watchGetClientExchanges),
    fork(watchDownloadClients),
    fork(watchEditInterplaza),
    fork(watchDisableClient),
  ]);
}
