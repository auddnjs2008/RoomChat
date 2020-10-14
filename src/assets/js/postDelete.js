import axios from "axios";

const deleteBtn = document.querySelector(".commentDelete");

const deleteAxios = async (id) => {
  const request = await axios({
    url: "/api/board/delete",
    method: "POST",
    data: {
      postId: id,
    },
  });
  if (request.status === 200) window.location.href = "/board?page=1";
};

const handleDelete = () => {
  const postId = window.location.href.split("board/")[1];
  deleteAxios(postId);
};

const init = () => {
  if (deleteBtn) deleteBtn.addEventListener("click", handleDelete);
};

init();
