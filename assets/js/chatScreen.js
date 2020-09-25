import axios from "axios";
import { getEnterSocket } from "./enterRoom";

const { initSockets, getSocket } = require("./socket");

const chatForm = document.querySelector(".chatForm");
const chatRoom = document.querySelector(".chatRoom");
const chatInput = document.querySelector(".input");
const comments = document.querySelector(".comments");

const roomID = chatForm
  ? window.location.href.split("chat/")[1].split("?")[0]
  : "";

let socket = null;

const addChatMessage = (message, name, avatarUrl) => {
  const li = document.createElement("li");

  if (name !== undefined) {
    li.className = "InputNotMyMessage";
    li.innerHTML = avatarUrl
      ? `<div class="NotMymessageProfile"> <img src=${avatarUrl}></img> <div class="messageName">${name}</div></div>
    <div class="messageContent">${message}</div>`
      : `<div class="NotMymessageProfile">  <div class="iconWrapper"><i class="fas fa-user-alt"></i></div><div class="messageName">${name}</div></div>
      <div class="messageContent">${message}</div>`;
  } else {
    //내 매세지일 경우
    li.className = "InputMyMessage";

    li.innerHTML = `<div class="Mymessage__content">${message}</div>`;
  }
  comments.appendChild(li);
  chatRoom.scrollTop = chatRoom.scrollHeight;
};

const socketMessage = (message) => {
  const userId = window.location.href.split("/chat")[0].split("user/")[1];

  socket.emit("sendMessage", { roomID, message, userId });
};

export const receiveChat = ({ message, name, avatarUrl }) => {
  addChatMessage(message, name, avatarUrl);
};

const handleChat = (event) => {
  event.preventDefault();
  const message = chatInput.value;
  if (message !== "") {
    socketMessage(message);
    addChatMessage(message);
    chatInput.value = "";
  }
};

const init = () => {
  if (chatForm) {
    socket = io("/");
    socket.emit("socketJoin");
    chatRoom.scrollTop = chatRoom.scrollHeight;
    chatForm.addEventListener("submit", handleChat);
    socket.on("receiveMessage", receiveChat);
  }
};

init();
