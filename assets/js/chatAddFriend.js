const chatAddForm = document.querySelector(".chatFriends__form");
const chatAddInput = chatAddForm ? chatAddForm.querySelector("input") : "";
const chatAddUl = document.querySelector(".plusFriends");

const foundFriend = (findValue) => {
  if (findValue.length !== 0) {
    chatAddUl.innerText = "";
    chatAddUl.innerHTML = findValue[0].avatarUrl
      ? `<div class="chatAddFriend">
            <img src=${findValue[0].avatarUrl} />
            <div class="chatAddName"/>${findValue[0].name}</div>
        </div> 
        <i class="fas fa-plus-circle chatAddBtn"></i>
        `
      : `<div class="chatAddFriend"> <i class="fas fa-user-alt"></i>
        <div class="chatAddName"/>${findValue[0].name}</div> </div>
        <i class="fas fa-plus-circle chatAddBtn"></i>
        `;
  } else {
    chatAddUl.innerText = "Can't Find";
  }
};

const chatAddSocket = (findValue) => {
  const socket = io("/");
  socket.emit("chatFindFriend", { findValue });
  socket.on("findFriend", ({ findFriend }) => foundFriend(findFriend));
};

const handleChatAdd = (e) => {
  e.preventDefault();
  const findValue = chatAddInput.value;
  chatAddInput.value = "";
  chatAddSocket(findValue);
};

const init = () => {
  chatAddForm.addEventListener("submit", handleChatAdd);
};

init();
