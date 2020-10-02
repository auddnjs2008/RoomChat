const changeBtn = document.querySelector(".changeRoomDesignBtn");
const roomGridWrapper = document.querySelector(".roomGridWrapper");
const roomItems = roomGridWrapper ? roomGridWrapper.querySelectorAll("a") : "";

const controllBtn = document.querySelector(".controllBtn");
const changeLeftBtn = document.querySelector(".changeLeftBtn");
const changeRightBtn = document.querySelector(".changeRightBtn");

const handleChangeStyle = (e) => {
  if (controllBtn.style.width === "") {
    changeLeftBtn.style.display = "inline";
    changeRightBtn.style.display = "inline";
  } else {
    console.log(controllBtn.style.width);
    changeLeftBtn.style.display = "none";
    changeRightBtn.style.display = "none";
  }
  roomItems.forEach((item) => {
    item.classList.toggle("roomsOutWrapper");
    item.classList.toggle("pressChangeBtn");
  });
};

const handleLeft = (e) => {
  console.log(e.target);
};
const handleRight = (e) => {
  console.log(e.target);
};

const init = () => {
  if (changeBtn) changeBtn.addEventListener("click", handleChangeStyle);
  if (changeLeftBtn) changeLeftBtn.addEventListener("click", handleLeft);
  if (changeRightBtn) changeRightBtn.addEventListener("click", handleRight);
};

init();
