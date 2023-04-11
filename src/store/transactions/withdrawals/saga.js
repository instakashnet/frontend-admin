import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { attachVoucherSvc, changeWithdrawalStatusSvc, getWithdrawalDetailsSvc } from '../../../api/services/exchange.service'
import { setAlert } from '../../actions'
import * as actions from './actions'
import * as types from './types'

function* getWithdrawalDetails({ id }) {
  try {
    const res = yield call(getWithdrawalDetailsSvc, id)
    yield put(actions.getWithdrawalDetailsSuccess(res))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.withdrawalsError())
  }
}

function* attachVoucher({ id, values }) {
  const formData = new FormData()
  formData.append('file', values.file)
  try {
    yield call(attachVoucherSvc, id, formData)
  } catch (error) {
    throw error
  }
}

function* changeWithdrawalStatus({ id, statusId, values, toggle }) {
  try {
    if (statusId === 6) {
      yield call(attachVoucher, { id, values, toggle })
      yield call(toggle, false)
    }
    yield call(changeWithdrawalStatusSvc, id, statusId)
    yield call(getWithdrawalDetails, { id })
    yield put(actions.changeWithdrawalStatusSuccess())
    yield put(setAlert('danger', `El retiro fue ${statusId === 5 ? 'cancelado' : 'aprobado'} correctamente.`))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.withdrawalsError())
  }
}

export function* watchGetWithdrawalDetails() {
  yield takeEvery(types.GET_WITHDRAW_DETAILS_INIT, getWithdrawalDetails)
}

export function* watchChangeWithdrawalStatus() {
  yield takeEvery(types.CHANGE_WITHDRAW_STATUS_INIT, changeWithdrawalStatus)
}

export default function* withdrawalsSaga() {
  yield all([fork(watchGetWithdrawalDetails), fork(watchChangeWithdrawalStatus)])
}
