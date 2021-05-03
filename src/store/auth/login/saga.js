import { takeEvery, fork, put, all, call, delay } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, LOAD_USER } from './actionTypes';
import * as actions from './actions';
import { authInstance } from '../../../helpers/AuthType/axios';

function* loadUser({ history }) {
  const authUser = yield call([localStorage, 'getItem'], 'authUser');

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
    yield delay(1000);
    const res = yield authInstance.get('/users/admin/session');

    yield call([sessionStorage, 'setItem'], 'session', JSON.stringify(res.data.activityUser));
    yield put(actions.loginSuccess(user, accessToken));
    yield history && history.push('/dashboard');
  } catch (error) {
    yield put(actions.logoutUser(history));
    yield put(actions.loadUserError());
  }
}

function* loginUser({ payload }) {
  const { user, history } = payload;
  try {
    const res = yield authInstance.post('auth/admin/signin', user);

    const userObj = {
      accessToken: res.data.accessToken,
      userId: res.data.id,
      tokenExp: res.data.expiresIn,
      user: { name: res.data.name, email: res.data.email, role: res.data.roles[0] },
    };

    yield call([localStorage, 'setItem'], 'authUser', JSON.stringify(userObj));
    yield call(loadUser, { history });
  } catch (error) {
    let message = error.message;

    if (error.status !== 500) {
      message = 'Las credenciales de acceso no son correctas.';
    }

    yield put(actions.apiError(message));
    yield delay(5000);
    yield put(actions.clearAlert());
  }
}

function* logoutUser({ payload }) {
  const { history } = payload;

  try {
    yield authInstance.post('/auth/logout');
  } catch (error) {
    console.log(error);
  }

  yield localStorage.removeItem('authUser');
  yield history && history.push('/');
  yield put(actions.logoutUserSuccess());
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

export default function* authSaga() {
  yield all([fork(watchLoadUser), fork(watchUserLogin), fork(watchUserLogout)]);
}
