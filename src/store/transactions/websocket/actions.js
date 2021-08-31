import { CONNECT_SOCKET, DISCONNECT_SOCKET } from "./types";

export const connectWs = () => ({
  type: CONNECT_SOCKET,
});

export const disconnectWs = () => ({
  type: DISCONNECT_SOCKET,
});
