import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { addBankSvc, editBankSvc, getBanksSvc, toggleBankSvc } from '../../../api/services/accounts.service'
import { setAlert } from '../../actions'
import * as actions from './actions'
import * as actionTypes from './actionTypes'

function* getBanks() {
  try {
    const res = yield call(getBanksSvc)
    yield put(actions.getBanksSuccess(res))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* addBank({ values, setState }) {
  try {
    yield call(addBankSvc, values)
    yield put(actions.addBankSuccess())
    yield call(getBanks)
    yield call(setState)
    yield put(setAlert('success', 'El banco ha sido agregado correctamente.'))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* editBank({ id, values, close }) {
  try {
    yield call(editBankSvc, id, values)
    yield call(getBanks)
    yield call(close)
    yield put(setAlert('success', `El banco fue editado correctamente.`))
    yield put(actions.editBankSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

function* toggleBank({ id, enabled }) {
  try {
    yield call(toggleBankSvc, id, enabled)
    yield call(getBanks)
    yield put(setAlert('success', `El banco fue ${enabled ? 'habilitado' : 'deshabilitado'} correctamente.`))
    yield put(actions.toggleBankSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.apiError())
  }
}

export function* watichEditBank() {
  yield takeEvery(actionTypes.EDIT_BANK, editBank)
}

export function* watchAddBank() {
  yield takeEvery(actionTypes.ADD_BANK, addBank)
}

export function* watchToggleBank() {
  yield takeLatest(actionTypes.TOGGLE_BANK, toggleBank)
}

export function* watchGetBanks() {
  yield takeEvery(actionTypes.GET_BANKS, getBanks)
}

export default function* banksSaga() {
  yield all([fork(watchGetBanks), fork(watchAddBank), fork(watichEditBank), fork(watchToggleBank)])
}
