import axios from "axios";

const postCommentWrapper = document.querySelector(".postCommentWrapper");
const commentForm = postCommentWrapper
  ? postCommentWrapper.querySelector(".formContainer")
  : "";
const commentInput = commentForm
  ? commentForm.querySelector(".commentInput")
  : "";

const commentUl = postCommentWrapper
  ? postCommentWrapper.querySelector(".postCommentes")
  : "";

const addPostComment = (value) => {
  const li = document.createElement("li");
  li.innerText = value;
  li.className = "instantLi";
  commentUl.appendChild(li);
};

const addCommentAxios = async (value) => {
  const postId = window.location.href.split("board/")[1];
  const request = await axios({
    url: "/api/board/comment",
    method: "POST",
    data: {
      comment: value,
      postId,
    },
  });
};

const handleCommentAdd = (e) => {
  e.preventDefault();
  const value = commentInput.value;
  addPostComment(value);
  addCommentAxios(value);
  commentInput.value = "";
  commentUl.scrollTop = commentUl.scrollHeight;
};

const init = () => {
  if (commentForm) {
    commentForm.addEventListener("submit", handleCommentAdd);
  }
};

init();
