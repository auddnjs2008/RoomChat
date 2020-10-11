const postDetail = document.querySelector(".postDetailWrapper");

const postComment = document.querySelector(".postCommentWrapper");

const commentBtn = document.querySelector(".commentButton");

const postBackBtn = document.querySelector(".postContentBtn");

const handleCommentBtn = () => {
  postComment.classList.toggle("changePostShow");
  postDetail.classList.toggle("changePostShow");
};

const init = () => {
  commentBtn.addEventListener("click", handleCommentBtn);
  postBackBtn.addEventListener("click", handleCommentBtn);
};

init();
