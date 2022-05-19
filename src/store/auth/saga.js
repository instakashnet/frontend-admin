import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loadUserSvc, loginUserSvc, logoutUserSvc, refreshTokenSvc, setOnlineSvc } from "../../api/services/auth.service";
import history from "../../helpers/history";
import * as actions from "./actions";
// Login Redux States
import { LOAD_USER, LOGIN_USER, LOGOUT_USER, REFRESH_TOKEN, SET_ONLINE_INIT } from "./actionTypes";

function setRoleRedirect(role) {
  let route = "/dashboard";
  if (role === "ROLE_OPERATOR" || role === "ROLE_ANALYST" || role === "ROLE_SIGNATORY" || role === "ROLE_OFFICER") route = "/exchanges/all";

  return route;
}

function* refreshToken() {
  try {
    const res = yield call(refreshTokenSvc);
    yield put(actions.refreshTokenSuccess(res));
    yield call(loadUser);
  } catch (error) {
    yield put(actions.logoutUserSuccess());
  }
}

function* loadUser() {
  try {
    const res = yield call(loadUserSvc),
      userData = { ...res },
      redirectRoute = yield call(setRoleRedirect, userData.roles);

    yield put(actions.loadUserSuccess(userData));
    yield history.push(redirectRoute);
  } catch (error) {
    yield put(actions.logoutUser());
  }
}

function* loginUser({ values }) {
  try {
    const res = yield call(loginUserSvc, values);
    yield put(actions.loginSuccess(res));
    yield call(loadUser);
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* setOnline() {
  try {
    yield call(setOnlineSvc);
    const session = yield call(loadUserSvc),
      userData = { ...session };
    yield put(actions.setOnlineSuccess(userData));
  } catch (error) {
    console.log(error);
    yield put(actions.apiError());
  }
}

function* logoutUser() {
  try {
    yield call(logoutUserSvc);
  } catch (error) {
    console.log(error);
  }
  yield put(actions.logoutUserSuccess());
  yield call([history, "push"], "/login");
}

export default function* authSaga() {
  yield all([
    yield takeEvery(LOAD_USER, loadUser),
    yield takeLatest(LOGIN_USER, loginUser),
    yield takeLatest(SET_ONLINE_INIT, setOnline),
    yield takeEvery(LOGOUT_USER, logoutUser),
    yield takeEvery(REFRESH_TOKEN.INIT, refreshToken),
  ]);
}
