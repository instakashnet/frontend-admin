import { eventChannel, END } from "redux-saga";
import { call, put, take, fork, cancel, select, cancelled } from "redux-saga/effects";

import { setAlert } from "../../alert/actions";
import { CONNECT_SOCKET, DISCONNECT_SOCKET } from "./types";

const createConnection = (token) =>
  new Promise((resolve, reject) => {
    console.log(process.env.REACT_APP_TEST_SOCKET_CONN);

    const socket = new WebSocket(process.env.REACT_APP_TEST_SOCKET_CONN + "?token=" + token);

    socket.onopen = () => resolve(socket);
    socket.onerror = (evt) => reject(evt);
  });

const createSocketChannel = (socket) =>
  eventChannel((emit) => {
    socket.onmessage = (e) => emit(JSON.parse(e.data));

    socket.onclose = () => emit(END);

    const unsubscribe = () => (socket.onmessage = null);

    return unsubscribe;
  });

function* listenForMessages() {
  let socket;
  let channel;

  const token = yield select((state) => state.Login.token);

  try {
    socket = yield call(createConnection, token);
    channel = yield call(createSocketChannel, socket);

    console.log("Connection established!.");

    while (true) {
      const payload = yield take(channel);
      console.log(payload);
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      channel.close();
      socket.close();
    } else {
      yield put(setAlert("danger", "connection closed due error."));
    }
  }
}

function* connect() {
  // starts the task in the background
  yield take(CONNECT_SOCKET);
  const socketTask = yield fork(listenForMessages);

  // when DISCONNECT action is dispatched, we cancel the socket task
  yield take(DISCONNECT_SOCKET);
  yield cancel(socketTask);
  console.log("connection disconnected.");
}

export default function* connectSaga() {
  yield fork(connect);
}
