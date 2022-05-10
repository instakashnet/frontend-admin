import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import { getAxiosInstance } from "../../../api/axios";
import { setAlert } from "../../actions";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getBanks() {
  try {
    const res = yield getAxiosInstance("accounts", "v1").get("/banks");
    if (res.status === 200) yield put(actions.getBanksSuccess(res.data.banks));
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* addBank({ values, setState }) {
  try {
    const res = yield getAxiosInstance("accounts", "v1").post("/banks", values);
    if (res.status === 201) {
      yield put(actions.addBankSuccess());
      yield call(getBanks);
      yield call(setState);
      yield Swal.fire("Exitoso", "El banco ha sido agregado correctamente.", "success");
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editBank({ id, values, close }) {
  try {
    const res = yield getAxiosInstance("accounts", "v1").put(`/banks/${id}`, values);
    if (res.status === 201) {
      yield call(getBanks);
      yield call(close);
      yield put(setAlert("success", `El banco fue editado correctamente.`));
      yield put(actions.editBankSuccess());
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* toggleBank({ id, enabled }) {
  try {
    const res = yield getAxiosInstance("accounts", "v1").put(`enabled-banks/${id}`, { enabled });
    if (res.status === 200) {
      yield call(getBanks);
      yield put(setAlert("success", `El banco fue ${enabled ? "habilitado" : "deshabilitado"} correctamente.`));
      yield put(actions.toggleBankSuccess());
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
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
