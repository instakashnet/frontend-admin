import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { addCouponSvc, deleteCouponSvc, disableCouponSvc, editCouponSvc, getCouponsSvc } from '../../../api/services/exchange.service'
import { setAlert } from '../../actions'
import * as actions from './actions'
import * as types from './types'

function* getCoupons() {
  try {
    const res = yield call(getCouponsSvc)
    const formattedData = res
    for (let i = 0; i < formattedData.length; i++) {
      formattedData[i].users = formattedData[i].users.filter((u) => u !== 0)
    }

    yield put(actions.getCouponsSuccess(formattedData))
  } catch (error) {
    yield put(actions.couponsError())
  }
}

function* addCoupon({ values, closeModal }) {
  const couponValues = {
    ...values,
    forexId: 1,
    active: true,
    endDate: values.endDate ? new Date(values.endDate).getTime() : 0,
    minAmountBuy: values.minAmountBuy || 0,
    minAmountSell: values.minAmountSell || 0,
    qty_uses: values.qty_uses || 0,
    users: values.users && values.users.length > 0 ? values.users : [0]
  }
  try {
    yield call(addCouponSvc, couponValues)
    yield call(getCoupons)
    yield call(closeModal)
    yield put(setAlert('success', 'Cupón agregado correctamente'))

    yield put(actions.addCouponSuccess())
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.couponsError())
  }
}

function* getCouponDetails({ id }) {
  try {
    let details = {}
    if (id) details = yield select((state) => state.Coupons.coupons.find((c) => c.Id === id))
    if (details) yield put(actions.getCouponsDetailsSuccess(details))
  } catch (error) {
    yield put(actions.couponsError())
  }
}

function* editCoupon({ id, values, active, closeModal }) {
  const couponValues = {
    ...values,
    name: values.name.toUpperCase(),
    active,
    forexId: 1,
    minAmountBuy: values.minAmountBuy || 0,
    minAmountSell: values.minAmountSell || 0,
    endDate: values.endDate ? new Date(values.endDate).getTime() : 0
  }
  try {
    yield call(editCouponSvc, id, couponValues)
    yield call(closeModal)
    yield call(getCoupons)
    yield put(actions.editCouponSuccess())
    yield put(setAlert('success', 'Cupón editado correctamente'))
  } catch (error) {
    if (error?.message) yield put(setAlert('danger', error.message))
    yield put(actions.couponsError())
  }
}

function* deleteCoupon({ id }) {
  try {
    yield call(deleteCouponSvc, id)
    yield call(getCoupons)
    yield put(setAlert('success', 'El cupón ha sido eliminado.'))

    yield put(actions.deleteCouponSuccess())
  } catch (error) {
    yield put(actions.couponsError())
  }
}

function* disableCoupon({ id, active }) {
  try {
    yield call(disableCouponSvc, id, active)
    yield call(getCoupons)
    yield put(setAlert('success', `El cupón ha sido ${active ? 'habilitado' : 'deshabilitado'}.`))
  } catch (error) {
    yield put(actions.couponsError())
  }
}

export function* watchGetCoupons() {
  yield takeEvery(types.GET_COUPONS_INIT, getCoupons)
}

export function* watchAddCoupon() {
  yield takeLatest(types.ADD_COUPON_INIT, addCoupon)
}

export function* watchDisableCoupon() {
  yield takeLatest(types.DISABLE_COUPON_INIT, disableCoupon)
}

export function* watchDeleteCoupon() {
  yield takeLatest(types.DELETE_COUPON_INIT, deleteCoupon)
}

export function* watchEditCoupon() {
  yield takeLatest(types.EDIT_COUPON_INIT, editCoupon)
}

export function* watchGetCouponDetails() {
  yield takeLatest(types.GET_COUPONS_DETAILS_INIT, getCouponDetails)
}

export default function* getCouponsSaga() {
  yield all([
    fork(watchGetCoupons),
    fork(watchDisableCoupon),
    fork(watchAddCoupon),
    fork(watchDeleteCoupon),
    fork(watchGetCouponDetails),
    fork(watchEditCoupon)
  ])
}
