import { put, all, fork, apply, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import io from "socket.io-client";

function connect() {
  const socket = io(process.env.NODE_ENV === "production" ? "https://instakash-exchange-service.herokuapp.com/orders" : "https://exchange-service-on36n.ondigitalocean.app/orders");
  return new Promise((resolve) => {
    socket.on("connect", () => resolve(socket));
  });
}
