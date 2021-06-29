import { put, all, fork, takeEvery, call } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { setAlert } from "../actions";
import { accountsInstance } from "../../helpers/AuthType/axios";
import Swal from "sweetalert2";

function* getCbAccounts() {
  try {
    const res = yield accountsInstance.get("/admin/accounts?type=company");
    if (res.status === 200) yield put(actions.getCbAccountsSuccess(res.data.accounts));
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
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
      yield call(getCbAccounts);
      yield Swal.fire("Exitoso", "La cuenta fue agregada correctamente.", "success");
      yield call(setState);
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editCbAccount({ values, setState }) {
  try {
    const res = yield accountsInstance.put("/admin/accounts", values);
    if (res.status === 200) {
      yield put(actions.editCbAccountSuccess());
      yield call(getCbAccounts);
      yield Swal.fire("Cuenta editada", "Los datos de la cuenta fueron editados correctamente.", "success");
      yield call(setState);
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editCbBalance({ values, accountId, setState }) {
  try {
    const res = yield accountsInstance.put(`/admin/accounts/funds/${accountId}`, values);
    if (res.status === 200) {
      yield put(actions.editCbBalanceSuccess());
      yield call(getCbAccounts);
      yield Swal.fire("Exitoso", "Se agregó el balance correctamente.", "success");
      yield call(setState);
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
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

export default function* bankAccountsSaga() {
  yield all([fork(watchGetCbAccounts), fork(watchAddCbAccount), fork(watchEditCbBalance), fork(watchEditCbAccount)]);
}
