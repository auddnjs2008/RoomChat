import axios from "axios";

const shareButton = document.querySelector(".emailButton");
const shareUl = document.querySelector(".email");

const shareEmail = (email) => {
  const li = document.createElement("li");
  li.innerText = `${email} 친구 추가 부탁드립니다.`;
  shareUl.appendChild(li);
};

const shareAxios = async () => {
  const request = await axios({
    url: "/api/email/share",
    method: "post",
  });
};

const handleShareClick = () => {
  const socket = io("/");
  socket.on("connect", () => {
    socket.emit("findEmail");
    socket.on("foundEmail", ({ email, isTrue }) => {
      if (isTrue === undefined) shareEmail(email);
    });
  });
  shareAxios();
};

const init = () => {
  if (shareButton) shareButton.addEventListener("click", handleShareClick);
};

init();
