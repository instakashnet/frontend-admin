import fileDownload from "js-file-download";
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import { sendNotificationSvc } from "../../../api/lib/notification";
import { editInterplazaSvc, getClientAccountsSvc } from "../../../api/services/accounts.service";
import { addClientProfileSvc, disableClientSvc, downloadClientsSvc, editClientInfoSvc, editClientProfileSvc, getClientDetailsSvc, uploadDocumentSvc } from "../../../api/services/auth.service";
import { getClientExchangesSvc } from "../../../api/services/exchange.service";
import { setAlert } from "../../actions";
import { getExchangeDetails } from "../../transactions/currencyExchange/actions";
import { getWithdrawalDetailsInit } from "../../transactions/withdrawals/actions";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getClientDetails({ userId }) {
  try {
    const res = yield call(getClientDetailsSvc, userId);
    yield put(actions.getClientDetailsSuccess(res));
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* getClientExchanges({ userId }) {
  try {
    const res = yield call(getClientExchangesSvc, userId);
    yield put(actions.getClientExchangesSuccess(res));
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* addClientProfile({ values, closeModal }) {
  try {
    yield call(addClientProfileSvc, values);
    yield call(getClientDetails, { userId: values.userId });
    yield call(closeModal);
    yield Swal.fire("Exitoso", "El perfil fue agregado correctamente.", "success");
    yield put(actions.addProfileSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editClientInfo({ userId, values, closeModal }) {
  const profileValues = {
    ...values,
    phone: values.phone.replace("+", ""),
  };
  try {
    yield call(editClientInfoSvc, userId, profileValues);
    yield call(getClientDetails, { userId });
    yield call(closeModal);
    yield Swal.fire("Exitoso", "Los datos del usuario fueron editados correctamente.", "success");
    yield put(actions.editClientInfoSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editClientProfile({ values, closeModal }) {
  try {
    yield call(editClientProfileSvc, values);
    yield call(getClientDetails, { userId: values.userId });
    yield call(closeModal);
    yield Swal.fire("Exitoso", "Los datos del perfil fueron editados correctamente.", "success");
    yield put(actions.editProfileSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* uploadDocument({ values, userId, uploadType, close, setPercentage }) {
  let URL = `/users/${uploadType === "identity_photo" ? "upload-identity-photo" : "upload-identity-photo-two"}/${userId}`;
  const formData = new FormData();
  formData.append(uploadType === "identity_photo" ? "file-one" : "file-two", values[uploadType]);
  try {
    yield call(uploadDocumentSvc, URL, formData, setPercentage);
    yield call(getClientDetails, { userId });
    yield call(close);
    yield call([Swal, "fire"], "Exitoso", `El documento fue agregado correctamente.`, "success");
    yield put(actions.uploadDocumentSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* getClientAccounts({ id }) {
  try {
    const res = yield call(getClientAccountsSvc, id);
    yield put(actions.getClientAccountsSuccess(res));
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* downloadClients({ fileType }) {
  let URL;
  if (fileType === "companies") URL = "/users/companies/download";
  if (fileType === "clients") URL = "/users/clients/download";
  try {
    if (!URL) return;
    const res = yield call(downloadClientsSvc, URL);
    fileDownload(res, `${fileType}.xlsx`);
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editInterplaza({ values, detailsType, id, setState }) {
  try {
    yield call(editInterplazaSvc, values);
    if (detailsType === "exchange") yield put(getExchangeDetails(id));
    if (detailsType === "withdrawal") yield put(getWithdrawalDetailsInit(id));
    yield call(setState, false);
    yield Swal.fire("Exitoso", `Cuenta editada correctamente.`, "success");
    yield put(actions.editInterplazaSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
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
      confirmButtonText: "Sí, continuar",
    });
    if (result.isConfirmed) {
      yield call(disableClientSvc, { userId, active: !active });
      yield call(getClientDetails, { userId });
      yield Swal.fire("Exitoso", `Usuario ${active ? "deshabilitado" : "habilitado"}.`, "success");
      yield put(actions.disableClientSuccess());
    } else yield put(actions.apiError());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* sendNotification({ values, closeModal }) {
  try {
    yield call(sendNotificationSvc, values);
    yield Swal.fire("Exitoso", "Notificación enviada a todos los usuarios.", "success");
    yield call(closeModal);
    yield put(actions.sendNotificationSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
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

export function* watchSendNotification() {
  yield takeLatest(actionTypes.SEND_NOTIFICATION_INIT, sendNotification);
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
    fork(watchSendNotification),
  ]);
}
