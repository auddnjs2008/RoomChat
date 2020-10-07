const { getSocket } = require("./socket");

const FriendInviteBtn = document.querySelector(".chatFriendsPlus");
const chatUsers = document.querySelector(".chatUsers__users");
const closeBtn = document.querySelector(".closeBtn");

let socket = getSocket();

export const addUsers = (avatarUrl, name) => {
  const li = document.createElement("li");
  li.innerHTML = avatarUrl
    ? `<div class="chatAddFriend">
  <img src=${avatarUrl} />
  <div class="chatAddName"/>${name}</div>
</div> 
`
    : `<div class="chatAddFriend"> <div class="icon"><i class="fas fa-user-alt"></i></div>
<div class="chatAddName"/>${name}</div> </div>
`;

  chatUsers.appendChild(li);
};

const handleFindList = (e) => {
  chatUsers.innerHTML = "";
  const location = window.location.href.split("chat/")[1];
  socket = getSocket();
  socket.emit("findList", { location });
};

const init = () => {
  if (FriendInviteBtn) {
    FriendInviteBtn.addEventListener("click", handleFindList);
    socket.on("foundList", ({ peoples }) => {
      peoples.forEach((people) => addUsers(people.avatarUrl, people.name));
    });
  }
};

init();
