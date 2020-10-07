const bodyParser = require("body-parser");

const userChangeBtn = document.querySelector(".userChangeBtn");
const useresWrapper = document.querySelector(".useresWrapper");
const sliderLeftBtn = document.querySelector(".sliderLeftBtn");
const sliderRightBtn = document.querySelector(".sliderRightBtn");
const body = document.querySelector("body");
const handleUserDesign = (e) => {
  body.style.padding = "0";
  userChangeBtn.classList.add("rotate");
  setTimeout(() => userChangeBtn.classList.remove("rotate"), 250);
  sliderLeftBtn.classList.toggle("show");
  sliderRightBtn.classList.toggle("show");
  useresWrapper.classList.toggle("usersChangeDeisgn");
};

const init = () => {
  if (userChangeBtn) userChangeBtn.addEventListener("click", handleUserDesign);
};

init();
