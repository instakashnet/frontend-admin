import { takeEvery, takeLatest, fork, put, all, call, delay } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, LOAD_USER, SET_ONLINE_INIT } from "./actionTypes";
import * as actions from "./actions";
import { setAlert } from "../../actions";
import { authInstance } from "../../../helpers/AuthType/axios";
import history from "../../../helpers/history";

function setRoleRedirect(role) {
  let route = "/dashboard";
  if (role === "ROLE_OPERATOR" || role === "ROLE_ANALYST" || role === "ROLE_SIGNATORY" || role === "ROLE_OFFICER") route = "/exchanges/all";

  return route;
}

function* loadUser() {
  const authUser = yield call([localStorage, "getItem"], "authUser");

  if (!authUser) {
    yield call([history, "push"], "/login");
    return yield put(actions.loadUserError());
  }

  const { accessToken, tokenExp, user } = JSON.parse(authUser);

  if (!accessToken) {
    yield put(actions.logoutUser(history));
    yield put(actions.loadUserError());
  }

  const date = new Date();
  const expTime = new Date(date.setMilliseconds(tokenExp * 1000));
  if (expTime <= new Date()) return yield put(actions.logoutUser(history));

  try {
    const res = yield authInstance.get("/users/session");
    const userData = { ...user, isOnline: res.data.online };

    const redirectRoute = yield call(setRoleRedirect, userData.role);
    yield put(actions.loginSuccess(userData, accessToken));
    yield history && history.push(redirectRoute);
    yield call(setAuthTimeout, expTime.getTime() - new Date().getTime());
  } catch (error) {
    yield put(actions.logoutUser(history));
    yield put(actions.loadUserError());
  }
}

function* setAuthTimeout(timeout) {
  yield delay(timeout - 6000);
  yield call(logoutUser);
}

function* loginUser({ payload }) {
  const { user } = payload;
  try {
    const res = yield authInstance.post("/auth/signin", user);

    const userObj = {
      accessToken: res.data.accessToken,
      userId: res.data.id,
      tokenExp: res.data.expiresIn,
      user: { name: res.data.name, email: res.data.email, role: res.data.roles[0] },
    };

    yield call([localStorage, "setItem"], "authUser", JSON.stringify(userObj));
    yield call(loadUser);
  } catch (error) {
    yield put(setAlert("danger", error.message));
    yield put(actions.apiError());
  }
}

function* setOnline() {
  try {
    const res = yield authInstance.put("/auth/online");
    if (res.status === 200) {
      const authUser = yield call([localStorage, "getItem"], "authUser");
      const { user } = JSON.parse(authUser);

      const res = yield authInstance.get("/users/session");
      const userData = { ...user, isOnline: res.data.online };
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

  yield call([localStorage, "removeItem"], "authUser");
  yield call([sessionStorage, "removeItem"], "session");
  yield call([history, "push"], "/login");
  yield put(actions.logoutUserSuccess());
}

export function* watchLoadUser() {
  yield takeEvery(LOAD_USER, loadUser);
}

export function* watchUserLogin() {
  yield takeLatest(LOGIN_USER, loginUser);
}

export function* watchSetOnline() {
  yield takeLatest(SET_ONLINE_INIT, setOnline);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default function* authSaga() {
  yield all([fork(watchLoadUser), fork(watchUserLogin), fork(watchUserLogout), fork(watchSetOnline)]);
}
