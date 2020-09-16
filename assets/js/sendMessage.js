import axios from "axios";
import { initSockets } from "./socket";
const sendBtn = document.querySelector(".sendBtn");

export const handleSendBtn = ({ id }) => {
  window.location.href = `/user/chat/${id}`;
};

const sendClick = async () => {
  const sendId = window.location.href.split("user/")[1].split("/profile")[0];
  const response = await axios({
    url: "/api/makeRoom",
    method: "POST",
    data: { sendId },
  });
  if (response.status === 200) {
    const socket = io("/");
    socket.on("connect", () => {
      socket.emit("sendBtn", { sendId });
      initSockets(socket);
    });
  }
};

const init = () => {
  if (sendBtn) sendBtn.addEventListener("click", sendClick);
};

init();
