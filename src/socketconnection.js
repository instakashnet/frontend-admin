import io from "socket.io-client";
const socket = io("https://instakash-exchange-service.herokuapp.com/orders", {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelayMax: 10000,
});

export default socket;
