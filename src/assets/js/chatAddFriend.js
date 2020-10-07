const { getSocket } = require("./socket");
import { addUsers } from "./chatUsersList";

const chatRoom = document.querySelector(".chatRoom");
const chatInputForm = document.querySelector(".chatFormWrapper");
const formContainer = document.querySelector(".chatFriendsForm");
const chatAddForm = document.querySelector(".chatFriends__form");
const chatAddInput = chatAddForm ? chatAddForm.querySelector("input") : "";
const chatAddUl = document.querySelector(".plusFriends");
const searchFriend = document.querySelector(".chatFriendsPlus");
const closeBtn = document.querySelector(".closeBtn");

const location = window.location.href.split("chat/")[1];

let socket = getSocket();
let Friend = null;

const foundFriend = (findValue, isPeople) => {
  if (findValue.length !== 0 && !isPeople) {
    Friend = findValue;
    chatAddUl.innerText = "";
    const li = document.createElement("li");
    li.innerHTML = findValue[0].avatarUrl
      ? `<div class="chatAddFriend">
            <img src=${findValue[0].avatarUrl} />
            <div class="chatAddName"/>${findValue[0].name}</div>
        </div> 
        <i class="fas fa-plus-circle chatAddBtn"></i>
        `
      : `<div class="chatAddFriend"> <div class="icon"><i class="fas fa-user-alt"></i></div>
        <div class="chatAddName"/>${findValue[0].name}</div> </div>
        <i class="fas fa-plus-circle chatAddBtn"></i>
        `;
    chatAddUl.appendChild(li);
    const chatAddBtn = li.querySelector(".chatAddBtn");
    chatAddBtn.addEventListener("click", handleInvite);
  } else if (findValue.length === 0) {
    chatAddUl.innerText = "Can't Find";
  } else if (isPeople) {
    chatAddUl.innerText = "The User is already in this Chat Room";
  }
};

const plusAlarm = (message, Friend) => {
  const alarmLi = document.createElement("li");
  alarmLi.className = "messageAlarm";
  alarmLi.innerText = message;
  const Ul = chatRoom.querySelector("ul");
  Ul.appendChild(alarmLi);
  addUsers(Friend[0].avatarUrl, Friend[0].name);
};

// 채팅창에 플러스 버튼을 눌렀을때 이벤트
const chatAddSocket = (findValue) => {
  socket.emit("chatFindFriend", { findValue, location });
  socket.on("findFriend", ({ findFriend, isPeople }) =>
    foundFriend(findFriend, isPeople)
  );
};

// 친구 초대창에서 친구 플러스 버튼을 눌렀을 때
const handleInvite = (e) => {
  e.target.style.display = "none";
  socket.emit("chatPlusFriend", { Friend, location });
};

// 찾을 이메일을 검색했을 때
const handleChatAdd = (e) => {
  e.preventDefault();
  if (chatAddUl.firstChild) chatAddUl.removeChild(chatAddUl.firstChild);
  const findValue = chatAddInput.value;
  chatAddInput.value = "";
  chatAddSocket(findValue);
};

const handleAddClick = () => {
  formContainer.style.display = "block";
  formContainer.classList.remove("modalCloseAnimation");
  formContainer.classList.add("modalAnimation");
  chatAddInput.classList.remove("inputCloseModal");
  chatAddInput.classList.add("inputModal");

  chatRoom.style.opacity = "0.1";
  chatInputForm.style.opacity = "0.1";
};

const handleCloseClick = () => {
  formContainer.classList.remove("modalAnimation");
  formContainer.classList.add("modalCloseAnimation");
  chatAddInput.classList.remove("inputModal");
  chatAddInput.classList.add("inputCloseModal");

  chatRoom.style.opacity = "1";
  chatInputForm.style.opacity = "1";
  if (chatAddUl.firstElementChilds)
    chatAddUl.removeChild(chatAddUl.firstElementChild);
  chatAddUl.innerText = "";
};

const init = () => {
  if (chatAddForm) {
    chatAddForm.addEventListener("submit", handleChatAdd);
    socket.on("chatPlusFriendAlarm", ({ message, Friend }) =>
      plusAlarm(message, Friend)
    );
  }
  if (searchFriend) searchFriend.addEventListener("click", handleAddClick);
  if (closeBtn) closeBtn.addEventListener("click", handleCloseClick);
};

init();
