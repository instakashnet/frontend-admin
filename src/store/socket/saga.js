import { call, all, fork, apply, take, put } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import * as types from "./types";
// import { GET_ORDERS } from "../transactions/currencyExchange/actionTypes";
import { getExchangesSuccess } from "../transactions/currencyExchange/actions";
import io from "socket.io-client";

const socketURL = process.env.NODE_ENV === "production" ? "https://instakash-exchange-service.herokuapp.com/orders" : "https://exchange-service-on36n.ondigitalocean.app/orders";

function connect() {
  const socket = io(socketURL);
  return new Promise((resolve) => {
    socket.on("connect", () => resolve(socket));
  });
}

const createSocketChannel = (socket, eventName) =>
  eventChannel((emit) => {
    const handler = (data) => emit(data);

    socket.on(eventName, handler);

    return () => {
      socket.emit("leaveGroup");
      socket.emit("disconnect");
    };
  });

function* joinGroup(socket, token) {
  yield apply(socket, socket.emit, ["joinGroup", { data: token }]);
}

function* getOrders(socket, token) {
  yield apply(socket, socket.emit, ["getOrders", { token, type: "SUBSCRIBE" }]);
}

function* changeOrderState(socket, token, orderId) {
  yield apply(socket, socket.emit, ["getOrders", { type: "PUBLISH", token, id: orderId }]);
}

function* onJoinedGroup(socket, token) {
  const groupChannel = yield call(createSocketChannel, socket, "joinedGroup");

  while (true) {
    try {
      yield take(groupChannel);
      yield fork(getOrders, socket, token);
    } catch (error) {
      console.log("group error: " + error);
    }
  }
}

function* onGetOrders(socket) {
  const ordersChannel = yield call(createSocketChannel, socket, "ordersTo");

  while (true) {
    try {
      const orders = yield take(ordersChannel);
      yield put(getExchangesSuccess(orders));
    } catch (error) {
      console.log("orders error: " + error);
    }
  }
}

function* listenSocketSaga() {
  try {
    const socket = yield call(connect);
    const { token } = yield take(types.JOIN_GROUP);
    yield fork(joinGroup, socket, token);
    yield fork(onJoinedGroup, socket, token);
    yield fork(onGetOrders, socket);

    while (true) {
      const { token, orderId } = yield take(types.CHANGE_ORDER_STATE);
      yield fork(changeOrderState, socket, token, orderId);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* watchSocketSaga() {
  yield all([fork(listenSocketSaga)]);
}
