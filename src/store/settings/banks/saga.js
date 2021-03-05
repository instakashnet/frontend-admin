import { all, call, put, takeEvery, fork, delay } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions.js";
import Swal from "sweetalert2";
import { accountsInstance } from "../../../helpers/AuthType/axios";

function* getBanks() {
  try {
    const res = yield accountsInstance.get("/admin/banks");
    if (res.status === 200) yield put(actions.getBanksSuccess(res.data.banks));
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error obteniendo los bancos. Por favor contacte a soporte."));
    yield delay(4000);
    yield put(actions.clearBankErrorAlert());
  }
}

function* addBank({ values, setState }) {
  try {
    const res = yield accountsInstance.post("/admin/banks", values);

    if (res.status === 201) {
      yield put(actions.addBankSuccess());
      yield call(getBanks);
      yield call(setState);
      yield Swal.fire("Exitoso", "El banco ha sido agregado correctamente.", "success");
    }
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error agregando el banco. Por favor contacta a soporte."));
  }
}

function* editBank({ payload }) {
  // const { id, values, reset } = payload;
  // const data = new FormData();
  // data.append("idBank", id);
  // data.append("name", values.name);
  // data.append("min", 13);
  // data.append("max", 14);
  // data.append("image", values.bankImage || null);
  // data.append("isDirect", true);
  // data.append("isAccount", values.addAccount);
  // data.append("ispayments", values.paymentOption);
  // data.append("rate", 3.0);
  // try {
  //   const res = yield clientAxios.post("/Banco/EditarBanco", data);
  //   if (res.status === 200) {
  //     yield put(actions.editBankSuccess("Banco agregado correctamente!"));
  //     yield call(reset);
  //     yield put(actions.getBanks());
  //     yield delay(4000);
  //     yield put(actions.clearBankSuccessAlert());
  //   }
  // } catch (error) {
  //   yield put(actions.apiError("Ha ocurrido un error editando el banco."));
  //   yield delay(4000);
  //   yield put(actions.clearBankErrorAlert());
  // }
}

function* deleteBank({ payload }) {
  // const { id } = payload;
  // try {
  //   const result = yield call([Swal, "fire"], {
  //     title: "¿Desea eliminar este banco?",
  //     text: "No podrá revertir esta acción.",
  //     icon: "warning",
  //     showDenyButton: true,
  //     confirmButtonText: `Si, eliminar!`,
  //     denyButtonText: `Cancelar`,
  //   });
  //   if (result.isConfirmed) {
  //     const res = yield clientAxios.post(`/Banco/EliminarBanco?Id=${id}`);
  //     if (res.status === 200) {
  //       Swal.fire("Exitoso!", "El usuario ha sido eliminado correctamente.", "success");
  //       yield put(actions.deleteBankSuccess());
  //       yield put(actions.getBanks());
  //       yield delay(4000);
  //       yield put(actions.clearBankSuccessAlert());
  //     }
  //   }
  // } catch (error) {
  //   yield put(actions.apiError(error.message));
  //   yield delay(4000);
  //   yield put(actions.clearBankErrorAlert());
  // }
}

export function* watichEditBank() {
  yield takeEvery(actionTypes.EDIT_BANK, editBank);
}

export function* watchDeleteBank() {
  yield takeEvery(actionTypes.DELETE_BANK, deleteBank);
}

export function* watchAddBank() {
  yield takeEvery(actionTypes.ADD_BANK, addBank);
}

export function* watchGetBanks() {
  yield takeEvery(actionTypes.GET_BANKS, getBanks);
}

export default function* banksSaga() {
  yield all([fork(watchGetBanks), fork(watchAddBank), fork(watchDeleteBank), fork(watichEditBank)]);
}
