import { takeEvery, fork, put, all, call, delay } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, LOAD_USER } from "./actionTypes";
import * as actions from "./actions";
import { authInstance } from "../../../helpers/AuthType/axios";

function* loadUser({ history }) {
  const authUser = yield call([localStorage, "getItem"], "authUser");

  if (!authUser) return yield put(actions.loadUserError());
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
    yield call([sessionStorage, "setItem"], "session", JSON.stringify(res.data.activityUser));
    yield put(actions.loginSuccess(user, accessToken));
    yield history && history.push("/dashboard");
  } catch (error) {
    yield put(actions.logoutUser(history));
    yield put(actions.loadUserError());
  }
}

function* loginUser({ payload }) {
  const { user, history } = payload;
  try {
    const res = yield authInstance.post("auth/admin/signin", user);

    const userObj = {
      accessToken: res.data.accessToken,
      userId: res.data.id,
      tokenExp: res.expiresIn,
      user: { name: res.data.first_name + " " + res.data.last_name, email: user.email, role: res.data.roles[0] },
    };
    yield call([localStorage, "setItem"], "authUser", JSON.stringify(userObj));
    yield put(actions.loadUser(history));
  } catch (error) {
    let message;
    error.status === 404 ? (message = "usuario y/o contraseña incorrectos.") : (message = error.message);
    yield put(actions.apiError(message));
    yield delay(5000);
    yield put(actions.clearAlert());
  }
}

function* logoutUser({ payload }) {
  const { history } = payload;

  yield localStorage.removeItem("authUser");
  yield history && history.push("/");
  yield put(actions.logoutUserSuccess());

  try {
    yield authInstance.post("/logout");
  } catch (error) {
    console.log(error);
  }
}

export function* watchLoadUser() {
  yield takeEvery(LOAD_USER, loadUser);
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* authSaga() {
  yield all([fork(watchLoadUser), fork(watchUserLogin), fork(watchUserLogout)]);
}

export default authSaga;
