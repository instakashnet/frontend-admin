import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import { addAcbAccountSvc, editCbAccountSvc, editCbBalanceSvc, getCbAccountsSvc } from "../../api/services/accounts.service";
import { updateBalanceSvc } from "../../api/services/exchange.service";
import { setAlert } from "../actions";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getCbAccounts() {
  try {
    const res = yield call(getCbAccountsSvc);
    yield put(actions.getCbAccountsSuccess(res));
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* addAcbAccount({ values, setState }) {
  const accValues = {
    ...values,
    currencyId: +values.currencyId,
  };

  try {
    yield call(addAcbAccountSvc, accValues);
    yield call(getCbAccounts);
    yield Swal.fire("Exitoso", "La cuenta fue agregada correctamente.", "success");
    yield put(actions.addCbAccountSuccess());
    yield call(setState);
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editCbAccount({ values, setState }) {
  try {
    yield call(editCbAccountSvc, values);
    yield call(getCbAccounts);
    yield Swal.fire("Cuenta editada", "Los datos de la cuenta fueron editados correctamente.", "success");
    yield put(actions.editCbAccountSuccess());
    yield call(setState);
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editCbBalance({ values, accountId, setState }) {
  try {
    yield call(editCbBalanceSvc, values, accountId);
    yield call(getCbAccounts);

    yield Swal.fire("Exitoso", "Se agregó el balance correctamente.", "success");
    yield put(actions.editCbBalanceSuccess());
    yield call(setState);
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* updateBalance({ enabled }) {
  try {
    const res = yield call(updateBalanceSvc, !enabled);
    yield put(actions.updateBalanceSuccess(res));
  } catch (error) {
    if (error?.message) yield put(setAlert("danger", error.message));
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

function* watchUpdateBalance() {
  yield takeEvery(actionTypes.UPDATE_BALANCE_INIT, updateBalance);
}

export default function* bankAccountsSaga() {
  yield all([fork(watchGetCbAccounts), fork(watchAddCbAccount), fork(watchEditCbBalance), fork(watchEditCbAccount), fork(watchUpdateBalance)]);
}
