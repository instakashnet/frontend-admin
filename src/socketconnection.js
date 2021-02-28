import io from "socket.io-client";
const socket = io(process.env.NODE_ENV !== "production" ? "https://instakash-exchange-service.herokuapp.com/orders" : "https://exchange-service-on36n.ondigitalocean.app/orders", {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelayMax: 10000,
});

export default socket;
