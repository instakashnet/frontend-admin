import { put, all, fork, call, takeEvery } from "redux-saga/effects";
import * as types from "./types";
import * as actions from "./actions";
import { setAlert } from "../../actions";
import { exchangeInstance } from "../../../helpers/AuthType/axios";
import Swal from "sweetalert2";
import camelize from "camelize";

function* getWithdrawalDetails({ id }) {
  try {
    const res = yield exchangeInstance.get(`/withdrawals/${id}`);
    if (res.status === 200) {
      const withdrawalDetails = camelize(res.data);
      yield put(actions.getWithdrawalDetailsSuccess(withdrawalDetails));
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.withdrawalsError());
  }
}

function* attachVoucher({ id, values }) {
  const formData = new FormData();
  formData.append("file", values.file);

  try {
    yield exchangeInstance.post(`/withdrawals/order/attach-voucher/${id}`, formData);
  } catch (error) {
    throw error;
  }
}

function* changeWithdrawalStatus({ id, statusId, values, toggle }) {
  try {
    const result = yield call([Swal, "fire"], {
      title: `¿Deseas ${statusId === 3 ? "cancelar" : "aprobar"} esta operación?`,
      text: "Al continuar no podrás revertir este estado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Si, continuar`,
      cancelButtonText: "No, regresar",
      cancelButtonColor: "#f46a6a",
    });

    if (result.isConfirmed) {
      if (statusId === 6) yield call(attachVoucher, { id, values, toggle });
      const res = yield exchangeInstance.put("/withdrawals/status", { id, status: statusId });
      if (res.status === 200) {
        yield call(getWithdrawalDetails, { id });
        yield put(actions.changeWithdrawalStatusSuccess());
        if (statusId === 6) yield call(toggle, false);
        yield Swal.fire("Exitoso", `El retiro fue ${statusId === 3 ? "cancelado" : "aprobado"} correctamente.`, "success");
      }
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
