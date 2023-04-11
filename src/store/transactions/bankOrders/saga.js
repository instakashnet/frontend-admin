import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getAxiosInstance } from '../../../api/axios'
import { setAlert } from '../../actions'
import * as actions from './actions'
import * as types from './types'

function* createBankOrder({ values, getData, closeModal }) {
  const orderValues = {
    ...values,
    rate: +values.rate
  }
  try {
    const res = yield getAxiosInstance('exchange', 'v1').post('/order/cashwithdraw', orderValues)
    if (res.status === 201) {
      yield call(getData)
      yield put(actions.createBankOrderSuccess())
      yield call(closeModal)
      yield put(setAlert('success', 'El pedido fue creado correctamente.'))
    }
  } catch (error) {
    yield put(actions.apiError())
    if (error?.message) yield put(setAlert('danger', error.message))
  }
}

function* getBankOrderDetails({ id }) {
  try {
    const res = yield getAxiosInstance('exchange', 'v1').get(`/order/cashwithdraw/${id}`)
    if (res.status === 200) yield put(actions.getBankOrderDetailsSuccess(res.data))
  } catch (error) {
    yield put(actions.apiError())
    if (error?.message) yield put(setAlert('danger', error.message))
  }
}

function* changeBankOrderStatus({ id, statusId }) {
  try {
    const res = yield getAxiosInstance('exchange', 'v1').put('/order/cashwithdraw', { id, status: statusId })
    if (res.status === 200) {
      yield put(actions.getBankOrderDetails(id))
      yield put(actions.changeBankOrderStatusSuccess())
      yield put(setAlert('success', 'Orden actualizada correctamente.'))
    }
  } catch (error) {
    yield put(actions.apiError())
    if (error?.message) yield put(setAlert('danger', error.message))
  }
}

function* watchCreateBankOrder() {
  yield takeLatest(types.CREATE_BANK_ORDER_INIT, createBankOrder)
}

function* watchGetBankOrderDetails() {
  yield takeEvery(types.GET_BANK_ORDER_DETAILS_INIT, getBankOrderDetails)
}

function* watchChangeBankOrderStatus() {
  yield takeLatest(types.CHANGE_BANK_ORDER_STATUS_INIT, changeBankOrderStatus)
}

export function* bankOrdersSaga() {
  yield all([fork(watchCreateBankOrder), fork(watchGetBankOrderDetails), fork(watchChangeBankOrderStatus)])
}
