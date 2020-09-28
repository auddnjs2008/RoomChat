const { getSocket } = require("./socket");

const chatRoom = document.querySelector(".chatRoom");
const chatInputForm = document.querySelector(".chatFormWrapper");
const formContainer = document.querySelector(".chatFriendsForm");
const chatAddForm = document.querySelector(".chatFriends__form");
const chatAddInput = chatAddForm ? chatAddForm.querySelector("input") : "";
const chatAddUl = document.querySelector(".plusFriends");
const searchFriend = document.querySelector(".chatFriendsPlus");
const closeBtn = document.querySelector(".closeBtn");

let socket = getSocket();
let Friend = null;

const foundFriend = (findValue) => {
  if (findValue.length !== 0) {
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
  } else {
    chatAddUl.innerText = "Can't Find";
  }
};

const plusAlarm = (message) => {
  const alarmLi = document.createElement("li");
  alarmLi.className = "messageAlarm";
  alarmLi.innerText = message;
  const Ul = chatRoom.querySelector("ul");
  Ul.appendChild(alarmLi);
};

// 채팅창에 플러스 버튼을 눌렀을때 이벤트
const chatAddSocket = (findValue) => {
  socket.emit("chatFindFriend", { findValue });
  socket.on("findFriend", ({ findFriend }) => foundFriend(findFriend));
};

// 친구 초대창에서 친구 플러스 버튼을 눌렀을 때
const handleInvite = (e) => {
  socket.emit("chatPlusFriend", { Friend });
};

// 찾을 이메일을 검색했을 때
const handleChatAdd = (e) => {
  e.preventDefault();
  if (chatAddUl.firstChild) chatAddUl.removeChild(chatAddUl.firstChild);
  const findValue = chatAddInput.value;
  chatAddInput.value = "";
  chatAddSocket(findValue);

  //friendAddBtn.addEventListener("click", handleInvite);
  // 친구 초대 버튼을 누르면 발생
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
  //formContainer.style.display = "none";
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
    socket.on("chatPlusFriendAlarm", ({ message }) => plusAlarm(message));
  }
  if (searchFriend) searchFriend.addEventListener("click", handleAddClick);
  if (closeBtn) closeBtn.addEventListener("click", handleCloseClick);
};

init();