import { put, call, takeLatest, takeEvery, fork, all } from "redux-saga/effects";
import Swal from "sweetalert2";

import { exchangeInstance } from "../../../helpers/AuthType/axios";
import * as actions from "./actions";
import * as types from "./types";
import { setAlert } from "../../actions";

function* createBankOrder({ values, getData, closeModal }) {
  const orderValues = {
    ...values,
    rate: +values.rate,
  };

  try {
    const res = yield exchangeInstance.post("/order/cashwithdraw", orderValues);
    if (res.status === 201) {
      yield call(getData);
      yield put(actions.createBankOrderSuccess());
      yield call(closeModal);
      yield Swal.fire("Pedido creado", "El pedido fue creado correctamente.", "success");
    }
  } catch (error) {
    yield put(actions.apiError());
    yield put(setAlert("danger", error.message));
  }
}

function* getBankOrderDetails({ id }) {
  try {
    const res = yield exchangeInstance.get(`/order/cashwithdraw/${id}`);
    if (res.status === 200) yield put(actions.getBankOrderDetailsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError());
    yield put(setAlert("danger", error.message));
  }
}

function* watchCreateBankOrder() {
  yield takeLatest(types.CREATE_BANK_ORDER_INIT, createBankOrder);
}

function* watchGetBankOrderDetails() {
  yield takeEvery(types.GET_BANK_ORDER_DETAILS_INIT, getBankOrderDetails);
}

export function* bankOrdersSaga() {
  yield all([fork(watchCreateBankOrder), fork(watchGetBankOrderDetails)]);
}
