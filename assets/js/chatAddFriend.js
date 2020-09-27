const chatRoom = document.querySelector(".chatRoom");
const chatInputForm = document.querySelector(".chatFormWrapper");
const formContainer = document.querySelector(".chatFriendsForm");
const chatAddForm = document.querySelector(".chatFriends__form");
const chatAddInput = chatAddForm ? chatAddForm.querySelector("input") : "";
const chatAddUl = document.querySelector(".plusFriends");
const searchFriend = document.querySelector(".chatFriendsPlus");
const closeBtn = document.querySelector(".closeBtn");

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
      : `<div class="chatAddFriend"> <div class="icon"><i class="fas fa-user-alt"></i></div>
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
  if (chatAddForm) chatAddForm.addEventListener("submit", handleChatAdd);
  if (searchFriend) searchFriend.addEventListener("click", handleAddClick);
  if (closeBtn) closeBtn.addEventListener("click", handleCloseClick);
};

init();
