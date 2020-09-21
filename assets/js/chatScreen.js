import axios from "axios";

const { initSockets, getSocket } = require("./socket");

const chatForm = document.querySelector(".chatForm");
const chatInput = document.querySelector(".input");
const comments = document.querySelector(".comments");

let socket;

const addChatMessage = (message, name, avatarUrl) => {
  const li = document.createElement("li");
  li.innerHTML = avatarUrl
    ? `<div class="messageProfile"> <img src=${avatarUrl}></img> <div class="messageName">${name}</div>
    <div class="messageContent">${message}</div>`
    : message;

  comments.appendChild(li);
};

const postChatMessage = async (message) => {
  const id = window.location.href.split("chat/")[1].split("?")[0];
  const request = axios({
    method: "post",
    url: "/api/room/messages",
    data: {
      id,
      message,
    },
  });
};

const socketMessage = (message) => {
  const id = window.location.href.split("chat/")[1].split("?")[0];
  socket.on("connect", () => {
    console.log(message);
    socket.emit("sendMessage", { id, message });
    initSockets(socket);
  });
};

export const receiveChat = ({ message, name, avatarUrl }) => {
  console.log("받은 메세지");
  console.log(message);
  addChatMessage(message, name, avatarUrl);
};

const handleChat = (event) => {
  event.preventDefault();
  const message = chatInput.value;
  //postChatMessage(message);
  socketMessage(message);
  addChatMessage(message);
  chatInput.value = "";
};

const init = () => {
  if (chatForm) {
    socket = io("/");
  }
  chatForm.addEventListener("submit", handleChat);
};

init();
