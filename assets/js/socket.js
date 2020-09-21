import { handleSendBtn } from "./sendMessage";
import { receiveChat } from "./chatScreen";
let socket = null;

export const getSocket = () => socket;

export const initSockets = (aSocket) => {
  socket = aSocket;
  socket.on("sendBtn", handleSendBtn);
  socket.on("sendMessage", receiveChat);
};
