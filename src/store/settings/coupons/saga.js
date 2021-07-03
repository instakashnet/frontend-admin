import { all, put, takeEvery, takeLatest, fork, select, call } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { setAlert } from "../../actions";
import { exchangeInstance } from "../../../helpers/AuthType/axios";
import Swal from "sweetalert2";

function* getCoupons() {
  try {
    const res = yield exchangeInstance.get("/coupons");
    if (res.status === 200) yield put(actions.getCouponsSuccess(res.data));
  } catch (error) {
    yield put(actions.couponsError());
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
    users: values.users && values.users.length > 0 ? values.users : [0],
  };

  try {
    const res = yield exchangeInstance.post("/coupons", couponValues);
    if (res.status === 201) {
      yield put(actions.addCouponSuccess());
      yield call(getCoupons);
      yield call(closeModal);
      yield call([Swal, "fire"], "Exitoso!", "Cupón agregado correctamente", "success");
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.couponsError());
  }
}

function* getCouponDetails({ id }) {
  try {
    let details = {};
    if (id) details = yield select((state) => state.Coupons.coupons.find((c) => c._id === id));
    if (details) yield put(actions.getCouponsDetailsSuccess(details));
  } catch (error) {
    yield put(actions.couponsError());
  }
}

function* editCoupon({ id, values, active, closeModal }) {
  const couponValues = {
    ...values,
    active,
    forexId: 1,
    minAmountBuy: values.minAmountBuy || 0,
    minAmountSell: values.minAmountSell || 0,
    endDate: values.endDate ? new Date(values.endDate).getTime() : 0,
  };

  try {
    const res = yield exchangeInstance.put(`/coupons/edit/${id}`, couponValues);
    if (res.status === 200) {
      yield put(actions.editCouponSuccess());
      yield call(getCoupons);
      yield call(closeModal);
      yield call([Swal, "fire"], "Exitoso!", "Cupón editado correctamente", "success");
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.couponsError());
  }
}

function* deleteCoupon({ id }) {
  try {
    const result = yield call([Swal, "fire"], {
      icon: "warning",
      title: "¿Deseas eliminar este cupón?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
    });

    if (result.isConfirmed) {
      const res = yield exchangeInstance.delete(`/coupons/${id}`);
      if (res.status === 200) {
        yield call([Swal, "fire"], "Exitoso", "El cupón ha sido eliminado.", "success");
        yield call(getCoupons);
      }
    } else yield put(actions.couponsError());
  } catch (error) {
    yield put(actions.couponsError());
  }
}

function* disableCoupon({ id, active }) {
  try {
    const result = yield call([Swal, "fire"], {
      icon: "warning",
      title: `¿Deseas ${active ? "habilitar" : "deshabilitar"} este cupón?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: `Si, ${active ? "habilitar" : "deshabilitar"}`,
    });

    if (result.isConfirmed) {
      const res = yield exchangeInstance.put(`/coupons/${id}`, { active });
      if (res.status === 200) {
        yield call(getCoupons);
        yield call([Swal, "fire"], "Exitoso!", `El cupón ha sido ${active ? "habilitado" : "deshabilitado"}.`, "success");
      }
    } else yield put(actions.couponsError());
  } catch (error) {
    yield put(actions.couponsError());
  }
}

export function* watchGetCoupons() {
  yield takeEvery(types.GET_COUPONS_INIT, getCoupons);
}

export function* watchAddCoupon() {
  yield takeLatest(types.ADD_COUPON_INIT, addCoupon);
}

export function* watchDisableCoupon() {
  yield takeLatest(types.DISABLE_COUPON_INIT, disableCoupon);
}

export function* watchDeleteCoupon() {
  yield takeLatest(types.DELETE_COUPON_INIT, deleteCoupon);
}

export function* watchEditCoupon() {
  yield takeLatest(types.EDIT_COUPON_INIT, editCoupon);
}

export function* watchGetCouponDetails() {
  yield takeLatest(types.GET_COUPONS_DETAILS_INIT, getCouponDetails);
}

export default function* getCouponsSaga() {
  yield all([fork(watchGetCoupons), fork(watchDisableCoupon), fork(watchAddCoupon), fork(watchDeleteCoupon), fork(watchGetCouponDetails), fork(watchEditCoupon)]);
}
