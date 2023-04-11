import axios from 'axios'
import fileDownload from 'js-file-download'
import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getAxiosInstance } from '../../../api/axios'
import { sendNotificationSvc } from '../../../api/lib/notification'
import {
  addClientBankAccSvc,
  deleteClientBankAccSvc,
  editClientBankAccSvc,
  editInterplazaSvc,
  getClientAccountsSvc
} from '../../../api/services/accounts.service'
import {
  addClientProfileSvc,
  deleteClientProfileSvc,
  disableClientSvc,
  downloadClientsSvc,
  editClientInfoSvc,
  editClientProfileSvc,
  getAffiliatesSvc,
  getClientDetailsSvc
} from '../../../api/services/auth.service'
import { getClientExchangesSvc, getClientWithdrawalsSvc } from '../../../api/services/exchange.service'
import { setAlert } from '../../actions'
import { getExchangeDetails } from '../../transactions/currencyExchange/actions'
import { getWithdrawalDetailsInit } from '../../transactions/withdrawals/actions'
import * as actions from './actions'
import * as actionTypes from './actionTypes'

function* getClientAffiliates({ userId }) {
  try {
    const res = yield call(getAffiliatesSvc, parseFloat(userId))
    yield put(actions.getAffiliatesSuccess(res))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* getClientAccounts({ id }) {
  try {
    const res = yield call(getClientAccountsSvc, id)
    yield put(actions.getClientAccountsSuccess(res))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* getClientDetails({ userId }) {
  try {
    const res = yield call(getClientDetailsSvc, userId)
    yield put(actions.getClientDetailsSuccess(res))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* getClientExchanges({ userId }) {
  try {
    const res = yield call(getClientExchangesSvc, userId)
    yield put(actions.getClientExchangesSuccess(res))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* getClientWithdrawals({ userId }) {
  try {
    const res = yield call(getClientWithdrawalsSvc, userId)
    yield put(actions.getClientWithdrawalsSuccess(res))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* addClientProfile({ values, closeModal }) {
  try {
    yield call(addClientProfileSvc, values)
    yield call(getClientDetails, { userId: values.userId })
    yield call(closeModal)
    yield put(setAlert('success', 'El perfil fue agregado correctamente.'))

    yield put(actions.addProfileSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* addClientBankAccount({ userId, values, closeModal }) {
  try {
    yield call(addClientBankAccSvc, userId, values)
    yield call(getClientAccounts, { id: userId })
    yield call(closeModal)
    yield put(setAlert('success', 'La cuenta ha sido agregada correctamente.'))

    yield put(actions.addClientBankAccSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* editClientBankAccount({ account, values, closeModal }) {
  const { userId, id } = account

  try {
    yield call(editClientBankAccSvc, id, values)
    yield call(getClientAccounts, { id: userId })
    yield call(closeModal)
    yield put(setAlert('success', 'La cuenta ha sido editada correctamente.'))

    yield put(actions.editClientBankAccSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* editClientInfo({ userId, values, closeModal }) {
  const profileValues = {
    ...values,
    phone: values.phone.replace('+', '')
  }
  try {
    yield call(editClientInfoSvc, userId, profileValues)
    yield call(getClientDetails, { userId })
    yield call(closeModal)
    yield put(setAlert('success', 'Los datos del usuario fueron editados correctamente.'))

    yield put(actions.editClientInfoSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* editClientProfile({ values, closeModal }) {
  try {
    yield call(editClientProfileSvc, values)
    yield call(getClientDetails, { userId: values.userId })
    yield call(closeModal)
    yield put(setAlert('success', 'Los datos del perfil fueron editados correctamente.'))

    yield put(actions.editProfileSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* uploadDocument({ values, userId, setPercentage }) {
  let options = {
    timeout: 99999,
    onUploadProgress: ({ loaded, total }) => {
      const percentage = Math.floor((loaded * 100) / total)
      if (percentage < 100) setPercentage(percentage)
    }
  }

  try {
    const urls = yield getAxiosInstance('base', 'v1').get(`/documents-service/v1/presigned-url/admin/uploads?userId=${userId}`)

    yield axios.put(urls.data.presignedFrontUrl, values.front, options)

    yield call(getClientDetails, { userId })
    yield put(setAlert('success', `La foto fue subída correctamente.`))

    yield put(actions.uploadDocumentSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* downloadClients({ fileType }) {
  let URL
  if (fileType === 'companies') URL = '/users/companies/download'
  if (fileType === 'clients') URL = '/users/clients/download'
  try {
    if (!URL) return
    const res = yield call(downloadClientsSvc, URL)
    fileDownload(res, `${fileType}.xlsx`)
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* editInterplaza({ values, detailsType, id, setState }) {
  try {
    yield call(editInterplazaSvc, values)
    if (detailsType === 'exchange') yield put(getExchangeDetails(id))
    if (detailsType === 'withdrawal') yield put(getWithdrawalDetailsInit(id))
    yield call(setState, false)
    yield put(setAlert('success', `Cuenta editada correctamente.`))

    yield put(actions.editInterplazaSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* disableClient({ userId, active }) {
  try {
    yield call(disableClientSvc, { userId, active: !active })
    yield call(getClientDetails, { userId })
    yield put(setAlert('success', `Usuario ${active ? 'deshabilitado' : 'habilitado'}.`))

    yield put(actions.disableClientSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* deleteClientBankAccount({ account, unselectAccs }) {
  const { id, userId } = account

  try {
    yield call(deleteClientBankAccSvc, id)
    yield call(getClientAccounts, { id: userId })
    yield call(unselectAccs)
    yield put(setAlert('success', 'La cuenta ha sido eliminada correctamente.'))

    yield put(actions.deleteClientBankAccSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* deleteClientProfile({ userId, profileId }) {
  const bodyRequest = {
    userId: parseFloat(userId)
  }

  try {
    yield call(deleteClientProfileSvc, profileId, bodyRequest)
    yield call(getClientDetails, { userId })
    yield put(actions.deleteProfileSuccess())
    yield put(setAlert('success', 'Perfil eliminado.'))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* sendNotification({ values, closeModal }) {
  try {
    yield call(sendNotificationSvc, values)
    yield put(setAlert('success', 'Notificación enviada a todos los usuarios.'))

    yield call(closeModal)
    yield put(actions.sendNotificationSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

export function* watchGetClientAffiliates() {
  yield takeEvery(actionTypes.GET_CLIENT_AFFILIATES, getClientAffiliates)
}

export function* watchGetClientExchanges() {
  yield takeEvery(actionTypes.GET_CLIENT_EXCHANGES, getClientExchanges)
}

export function* watchGetClientWithdrawals() {
  yield takeEvery(actionTypes.GET_CLIENT_WITHDRAWALS, getClientWithdrawals)
}

export function* watchGetClientActivity() {
  yield takeEvery(actionTypes.GET_CLIENT_ACCOUNTS, getClientAccounts)
}

export function* watchGetClientDetails() {
  yield takeEvery(actionTypes.GET_CLIENT_DETAILS, getClientDetails)
}

export function* watchAddClientProfile() {
  yield takeEvery(actionTypes.ADD_PROFILE_INIT, addClientProfile)
}

export function* watchAddClientBankAccount() {
  yield takeEvery(actionTypes.ADD_CLIENT_BANK_ACCOUNT_INIT, addClientBankAccount)
}

export function* watchEditClientBankAccount() {
  yield takeEvery(actionTypes.EDIT_CLIENT_BANK_ACCOUNT_INIT, editClientBankAccount)
}

export function* watchEditClientInfo() {
  yield takeLatest(actionTypes.EDIT_INFO_INIT, editClientInfo)
}

export function* watchUploadDocument() {
  yield takeLatest(actionTypes.UPLOAD_DOCUMENT_INIT, uploadDocument)
}

export function* watchEditClientProfile() {
  yield takeEvery(actionTypes.EDIT_PROFILE_INIT, editClientProfile)
}

export function* watchDownloadClients() {
  yield takeEvery(actionTypes.DOWNLOAD_CLIENTS_INIT, downloadClients)
}

export function* watchEditInterplaza() {
  yield takeLatest(actionTypes.EDIT_INTERPLAZA_INIT, editInterplaza)
}

export function* watchDisableClient() {
  yield takeLatest(actionTypes.DISABLE_CLIENT_INIT, disableClient)
}

export function* watchDeleteClientBankAccount() {
  yield takeEvery(actionTypes.DELETE_CLIENT_BANK_ACCOUNT_INIT, deleteClientBankAccount)
}

export function* watchDeleteClientProfile() {
  yield takeEvery(actionTypes.DELETE_PROFILE_INIT, deleteClientProfile)
}
export function* watchSendNotification() {
  yield takeLatest(actionTypes.SEND_NOTIFICATION_INIT, sendNotification)
}

export default function* clientsSaga() {
  yield all([
    fork(watchGetClientAffiliates),
    fork(watchGetClientDetails),
    fork(watchGetClientActivity),
    fork(watchGetClientExchanges),
    fork(watchGetClientWithdrawals),
    fork(watchAddClientProfile),
    fork(watchAddClientBankAccount),
    fork(watchEditClientBankAccount),
    fork(watchEditClientProfile),
    fork(watchEditClientInfo),
    fork(watchUploadDocument),
    fork(watchDownloadClients),
    fork(watchEditInterplaza),
    fork(watchDisableClient),
    fork(watchDeleteClientBankAccount),
    fork(watchDeleteClientProfile),
    fork(watchSendNotification)
  ])
}
