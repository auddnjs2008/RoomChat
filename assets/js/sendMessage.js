import axios from "axios";

const sendBtn = document.querySelector(".sendBtn");

const sendClick = async () => {
  const sendId = window.location.href.split("user/")[1].split("/profile")[0];
  await axios({
    url: "/api/makeRoom",
    method: "POST",
    data: { sendId },
  });
};

const init = () => {
  sendBtn.addEventListener("click", sendClick);
};

init();
