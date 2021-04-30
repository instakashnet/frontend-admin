import { put, all, fork, takeEvery, call, delay } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { exchangeInstance, authInstance, accountsInstance } from '../../../helpers/AuthType/axios';
import Swal from 'sweetalert2';
import fileDownload from 'js-file-download';

function* getClients() {
  try {
    const res = yield authInstance.get('/admin/users?type=client');
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
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* getClientExchanges({ userId }) {
  try {
    const res = yield exchangeInstance(`/order/admin/user/${userId}`);
    if (res.status === 200) yield put(actions.getClientExchangesSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* editClientProfile({ values, closeModal }) {
  try {
    const res = yield authInstance.put('/admin/users/profiles', values);
    if (res.status === 200) {
      yield put(actions.editProfileSuccess());
      yield call(closeModal);
      yield call(getClientDetails, { userId: values.userId });
      yield Swal.fire('Exitoso', 'Los datos del perfil fueron editados correctamente.', 'success');
    }
  } catch (error) {
    yield put(actions.apiError('Ha ocurrido un error editando los datos del perfil. Por favor contacta a soporte.'));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* getClientAccounts({ id }) {
  try {
    const res = yield accountsInstance.get(`/admin/accounts/${id}`);
    yield put(actions.getClientAccountsSuccess(res.data.accounts));
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* downloadClients({ fileType }) {
  let URL;

  if (fileType === 'companies') URL = '/users/admin/companies/download';
  if (fileType === 'clients') URL = '/users/admin/clients/download';

  try {
    if (!URL) return;
    const res = yield authInstance.get(URL, { responseType: 'arraybuffer' });
    fileDownload(res.data, `${fileType}.xlsx`);
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield delay(4000);
    yield put(actions.clearAlert());
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

export function* watchEditClientProfile() {
  yield takeEvery(actionTypes.EDIT_PROFILE_INIT, editClientProfile);
}

export function* watchDownloadClients() {
  yield takeEvery(actionTypes.DOWNLOAD_CLIENTS_INIT, downloadClients);
}

export default function* clientsSaga() {
  yield all([
    fork(watchGetClientDetails),
    fork(watchEditClientProfile),
    fork(watchGetClientActivity),
    fork(watchGetClientExchanges),
    fork(watchGetClients),
    fork(watchDownloadClients),
  ]);
}
