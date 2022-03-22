import { takeEvery, takeLatest, put, all, call } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, LOAD_USER, SET_ONLINE_INIT, REFRESH_TOKEN } from "./actionTypes";
import * as actions from "./actions";
import { authInstance } from "../../api/axios";
import history from "../../helpers/history";

function setRoleRedirect(role) {
  let route = "/dashboard";
  if (role === "ROLE_OPERATOR" || role === "ROLE_ANALYST" || role === "ROLE_SIGNATORY" || role === "ROLE_OFFICER") route = "/exchanges/all";

  return route;
}

function* refreshToken() {
  try {
    const res = yield authInstance.post("/auth/refresh");

    if (res.status === 200) {
      yield put(actions.refreshTokenSuccess(res.data.accessToken));
      yield call(loadUser);
    }
  } catch (error) {
    yield put(actions.logoutUserSuccess());
  }
}

function* loadUser() {
  try {
    const res = yield authInstance.get("/users/session"),
      userData = { ...res.data },
      redirectRoute = yield call(setRoleRedirect, userData.roles);

    yield put(actions.loadUserSuccess(userData));
    yield history.push(redirectRoute);
  } catch (error) {
    yield put(actions.logoutUser());
  }
}

function* loginUser({ values }) {
  try {
    const res = yield authInstance.post("/auth/signin", values);

    yield put(actions.loginSuccess(res.data.accessToken));
    yield call(loadUser);
  } catch (error) {
    yield put(actions.apiError());
  }
}

function* setOnline() {
  try {
    const res = yield authInstance.put("/auth/online");
    if (res.status === 200) {
      const session = yield authInstance.get("/users/session"),
        userData = { ...session.data };

      yield put(actions.setOnlineSuccess(userData));
    }
  } catch (error) {
    console.log(error);
    yield put(actions.apiError());
  }
}

function* logoutUser() {
  try {
    yield authInstance.post("/auth/logout");
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
