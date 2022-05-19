import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import { attachVoucherSvc, changeWithdrawalStatusSvc, getWithdrawalDetailsSvc } from "../../../api/services/exchange.service";
import { setAlert } from "../../actions";
import * as actions from "./actions";
import * as types from "./types";

function* getWithdrawalDetails({ id }) {
  try {
    const res = yield call(getWithdrawalDetailsSvc, id);
    yield put(actions.getWithdrawalDetailsSuccess(res));
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.withdrawalsError());
  }
}

function* attachVoucher({ id, values }) {
  const formData = new FormData();
  formData.append("file", values.file);
  try {
    yield call(attachVoucherSvc, id, formData);
  } catch (error) {
    throw error;
  }
}

function* changeWithdrawalStatus({ id, statusId, values, toggle }) {
  try {
    const result = yield call([Swal, "fire"], {
      title: `¿Deseas ${statusId === 5 ? "cancelar" : "aprobar"} esta operación?`,
      text: "Al continuar no podrás revertir este estado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Sí, continuar`,
      cancelButtonText: "No, regresar",
      cancelButtonColor: "#f46a6a",
    });
    if (result.isConfirmed) {
      if (statusId === 6) yield call(attachVoucher, { id, values, toggle });
      yield call(changeWithdrawalStatusSvc, id, statusId);
      yield call(getWithdrawalDetails, { id });
      yield put(actions.changeWithdrawalStatusSuccess());
      if (statusId === 6) yield call(toggle, false);
      yield Swal.fire("Exitoso", `El retiro fue ${statusId === 5 ? "cancelado" : "aprobado"} correctamente.`, "success");
    } else yield put(actions.withdrawalsError());
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.withdrawalsError());
  }
}

export function* watchGetWithdrawalDetails() {
  yield takeEvery(types.GET_WITHDRAW_DETAILS_INIT, getWithdrawalDetails);
}

export function* watchChangeWithdrawalStatus() {
  yield takeEvery(types.CHANGE_WITHDRAW_STATUS_INIT, changeWithdrawalStatus);
}

export default function* withdrawalsSaga() {
  yield all([fork(watchGetWithdrawalDetails), fork(watchChangeWithdrawalStatus)]);
}
