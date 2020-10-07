import { handleSendBtn } from "./sendMessage";

let socket = null;

export const getSocket = () => socket;

export const initSockets = (aSocket) => {
  socket = aSocket;
  socket.on("sendBtn", handleSendBtn);
};
