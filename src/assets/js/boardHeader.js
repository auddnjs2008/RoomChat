const boardMenu = document.querySelector(".BoardMenu");
const boardItems = boardMenu ? boardMenu.querySelectorAll("a") : "";

const location = window.location.href;

const init = () => {
  if (location.includes("page"))
    boardItems[0].style.backgroundColor = "#3498db";
  else if (location.includes("emailshare"))
    boardItems[1].style.backgroundColor = "#3498db";
  else if (location.includes("mypost"))
    boardItems[2].style.backgroundColor = "#3498db";
  else boardItems[3].style.backgroundColor = "#3498db";
};

if (boardItems.length !== 0) init();
