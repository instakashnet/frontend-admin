import { put, all, fork, takeEvery, call, delay } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { accountsInstance } from "../../../helpers/AuthType/axios";
import Swal from "sweetalert2";

function* getCbAccounts() {
  try {
    const res = yield accountsInstance.get("/admin/accounts?type=company");
    if (res.status === 200) yield put(actions.getCbAccountsSuccess(res.data.accounts));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* addAcbAccount({ values, setState }) {
  const accValues = {
    ...values,
    currencyId: +values.currencyId,
  };

  try {
    const res = yield accountsInstance.post("/admin/accounts", accValues);
    if (res.status === 201) {
      yield put(actions.addCbAccountSuccess());
      yield call(setState, false);
      yield call(getCbAccounts);
      yield Swal.fire("Exitoso", "La cuenta fue agregada correctamente.", "success");
    }
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error agregando la cuenta. Por favor contacta a soporte"));
  }
}

function* editCbAccount({ values, setState }) {
  try {
    const res = yield accountsInstance.put("/admin/accounts", values);
    if (res.status === 200) {
      yield put(actions.editCbAccountSuccess());
      yield call(getCbAccounts);
      yield call(setState, false);
      yield Swal.fire("Cuenta editada", "Los datos de la cuenta fueron editados correctamente.", "success");
    }
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error editar la cuenta. Por favor contacta a soporte"));
    yield delay(3000);
    yield put(actions.clearAlert());
  }
}

function* editCbBalance({ values, accountId, setState }) {
  try {
    const res = yield accountsInstance.put(`/admin/accounts/funds/${accountId}`, values);
    if (res.status === 200) {
      yield put(actions.editCbBalanceSuccess());
      yield call(getCbAccounts);
      yield call(setState, false);
      yield Swal.fire("Exitoso", "Se agregó el balance correctamente.", "success");
    }
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error al agregar el balance. Por favor contacta a soporte."));
    yield delay(3000);
    yield put(actions.clearAlert());
  }
}

export function* watchGetCbAccounts() {
  yield takeEvery(actionTypes.GET_CB_ACCOUNTS, getCbAccounts);
}

export function* watchEditCbAccount() {
  yield takeEvery(actionTypes.EDIT_CB_ACCOUNT, editCbAccount);
}

export function* watchAddCbAccount() {
  yield takeEvery(actionTypes.ADD_CB_ACCOUNT, addAcbAccount);
}

export function* watchEditCbBalance() {
  yield takeEvery(actionTypes.EDIT_CB_BALANCE, editCbBalance);
}

export default function* () {
  yield all([fork(watchGetCbAccounts), fork(watchAddCbAccount), fork(watchEditCbBalance), fork(watchEditCbAccount)]);
}
