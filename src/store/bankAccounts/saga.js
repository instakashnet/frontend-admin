import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import { getAxiosInstance } from "../../api/axios";
import { setAlert } from "../actions";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getCbAccounts() {
  try {
    const res = yield getAxiosInstance("accounts", "v1").get("/accounts?type=company");
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
    const res = yield getAxiosInstance("accounts", "v1").post("/accounts", accValues);
    if (res.status === 201) {
      yield call(getCbAccounts);
      yield Swal.fire("Exitoso", "La cuenta fue agregada correctamente.", "success");
      yield put(actions.addCbAccountSuccess());
      yield call(setState);
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editCbAccount({ values, setState }) {
  try {
    const res = yield getAxiosInstance("accounts", "v1").put("/accounts", values);
    if (res.status === 200) {
      yield call(getCbAccounts);
      yield Swal.fire("Cuenta editada", "Los datos de la cuenta fueron editados correctamente.", "success");
      yield put(actions.editCbAccountSuccess());
      yield call(setState);
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* editCbBalance({ values, accountId, setState }) {
  try {
    const res = yield getAxiosInstance("accounts", "v1").put(`/accounts/funds/${accountId}`, values);
    if (res.status === 200) {
      yield call(getCbAccounts);

      yield Swal.fire("Exitoso", "Se agregó el balance correctamente.", "success");
      yield put(actions.editCbBalanceSuccess());
      yield call(setState);
    }
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* closeBalance({ open }) {
  try {
    const res = yield getAxiosInstance("accounts", "v1").get("/closing-balances");
    if (res.status === 200) {
      yield put(actions.closeBalanceSuccess(res.data));
      yield call(open);
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

function* watchCloseBalance() {
  yield takeEvery(actionTypes.CLOSE_BALANCE_INIT, closeBalance);
}

export default function* bankAccountsSaga() {
  yield all([fork(watchGetCbAccounts), fork(watchAddCbAccount), fork(watchEditCbBalance), fork(watchEditCbAccount), fork(watchCloseBalance)]);
}
