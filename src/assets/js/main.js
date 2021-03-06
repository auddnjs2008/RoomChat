import "../scss/styles.scss";
import "./addFriend";
import "./sendMessage";
import "./chatScreen";
import "./enterRoom";
import "./roomLatestMessage";
import "./chatAddFriend";
import "./chatUsersList";
import "./roomsDesignChange";
import "./makeRoom";
import "./usersSliderBar";
import "./usersDeisgnChange";
import "./postCommentChange";
import "./postComment";
import "./postDelete";
import "./emailShare";
import "./boardHeader";
import "./deleteRoom";
import "./deleteFriend";

//footer 설정

const footer = document.querySelector(".footer__nav");
const ul = footer ? footer.querySelector("ul") : "";
const li = ul ? ul.querySelectorAll("li") : "";

const nowUrl = window.location.href;

const init = () => {
  if (li)
    li.forEach((item) => {
      const a = item.querySelector("a");
      const icon = a.querySelector("i");
      if (nowUrl === a.href) icon.style.color = "black";
    });
};

init();
