import axios from "axios";

const addFriendBtn = document.querySelector(".friendPlus");
const userWrapper = document.querySelector(".userWrapper");

const handleClick = async () => {
  const url = userWrapper.firstChild.firstChild.href;
  const userId = url.split("user/")[1].split("/")[0];
  // axios를 사용하여  userId를 서버에전송
  const response = await axios({
    url: `/api/${userId}/addfriend`,
    method: "POST",
  });
  if (response.status === 200) {
    addFriendBtn.style.display = "none";
  }

  //친구추가가 되었을 경우 알림표시
};

const init = () => {
  if (addFriendBtn) addFriendBtn.addEventListener("click", handleClick);
};

init();
