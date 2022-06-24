import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import { addBankSvc, editBankSvc, getBanksSvc, toggleBankSvc } from "../../../api/services/accounts.service";
import { setAlert } from "../../actions";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getBanks() {
  try {
    const res = yield call(getBanksSvc);
    yield put(actions.getBanksSuccess(res));
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* addBank({ values, setState }) {
  try {
    yield call(addBankSvc, values);
    yield put(actions.addBankSuccess());
    yield call(getBanks);
    yield call(setState);
    yield Swal.fire("Exitoso", "El banco ha sido agregado correctamente.", "success");
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editBank({ id, values, close }) {
  try {
    yield call(editBankSvc, id, values);
    yield call(getBanks);
    yield call(close);
    yield put(setAlert("success", `El banco fue editado correctamente.`));
    yield put(actions.editBankSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* toggleBank({ id, enabled }) {
  try {
    yield call(toggleBankSvc, id, enabled);
    yield call(getBanks);
    yield put(setAlert("success", `El banco fue ${enabled ? "habilitado" : "deshabilitado"} correctamente.`));
    yield put(actions.toggleBankSuccess());
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
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

export function* watchToggleBank() {
  yield takeLatest(actionTypes.TOGGLE_BANK, toggleBank);
}

export function* watchGetBanks() {
  yield takeEvery(actionTypes.GET_BANKS, getBanks);
}

export default function* banksSaga() {
  yield all([fork(watchGetBanks), fork(watchAddBank), fork(watchDeleteBank), fork(watichEditBank), fork(watchToggleBank)]);
}
