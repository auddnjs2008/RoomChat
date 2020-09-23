import axios from "axios";
const { initSockets, getSocket } = require("./socket");

const chatForm = document.querySelector(".chatForm");
const chatInput = document.querySelector(".input");
const comments = document.querySelector(".comments");

let socket = null;

const roomID = chatForm
  ? window.location.href.split("chat/")[1].split("?")[0]
  : "";

const addChatMessage = (message, name, avatarUrl) => {
  const li = document.createElement("li");
  li.className = "avatarMessage";
  li.innerHTML = avatarUrl
    ? `<div class="messageProfile"> <img src=${avatarUrl}></img> <div class="messageName">${name}</div>
    <div class="messageContent">${message}</div></div>`
    : message;

  comments.appendChild(li);
};

const socketMessage = (message) => {
  const userId = window.location.href.split("/chat")[0].split("user/")[1];

  socket.emit("sendMessage", { roomID, message, userId });
};

export const receiveChat = ({ message, name, avatarUrl }) => {
  console.log("받았다");
  addChatMessage(message, name, avatarUrl);
};

const handleChat = (event) => {
  event.preventDefault();
  const message = chatInput.value;
  socketMessage(message);
  addChatMessage(message);
  chatInput.value = "";
};

const init = () => {
  if (chatForm) {
    socket = io("/");
    chatForm.addEventListener("submit", handleChat);
    socket.on("receiveMessage", receiveChat);
  }
};

init();
