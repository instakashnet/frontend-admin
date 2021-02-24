import * as types from "./types";

export const setSocket = (socket) => ({
  type: types.SET_SOCKET,
  socket,
});
