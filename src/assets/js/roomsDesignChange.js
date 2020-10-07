const changeBtn = document.querySelector(".changeRoomDesignBtn");
const roomGridWrapper = document.querySelector(".roomGridWrapper");
const roomItems = roomGridWrapper
  ? roomGridWrapper.querySelectorAll(".roomsOutWrapper")
  : "";

const controllBtn = document.querySelector(".controllBtn");
const changeLeftBtn = document.querySelector(".changeLeftBtn");
const changeRightBtn = document.querySelector(".changeRightBtn");

let NodeStore = roomItems.length - 1;
let point = 0; // zindex 값
const handleChangeStyle = (e) => {
  changeBtn.style.transform = "rotate(180deg)";
  changeBtn.style.transformOrigin = "center center";
  changeBtn.style.transition = "all 0.3s linear";

  setTimeout(() => {
    changeBtn.style.transform = "rotate(0deg)";
    changeBtn.style.transition = "";
    changeBtn.style.transformOrigin = "";
  }, 250);
  roomItems.forEach((item) => {
    item.style.zIndex = "0";
    item.classList.remove("slideAnimation");
  });
  changeLeftBtn.classList.toggle("changeLeftBtn");
  changeLeftBtn.classList.toggle("changeShowLeftBtn");

  changeRightBtn.classList.toggle("changeRightBtn");
  changeRightBtn.classList.toggle("changeShowRightBtn");

  roomItems.forEach((item) => {
    item.classList.toggle("roomsOutWrapper");
    item.classList.toggle("pressChangeBtn");
  });
};

//맨처음이 끝에서 시작한다.
const handleLeft = (e) => {
  if (NodeStore === 0) {
    NodeStore = roomItems.length - 1;
    roomItems.forEach((item) => {
      item.style.zIndex = "0";
    });
    point = 0;
  } else NodeStore--;

  roomItems[NodeStore].style.zIndex = `${point + 1}`;
  roomItems[NodeStore].classList.add("slideAnimation");
  setTimeout(
    () => roomItems[NodeStore].classList.remove("slideAnimation"),
    1000
  );
  point++;
};

const handleRight = (e) => {
  if (NodeStore === roomItems.length - 1) {
    NodeStore = 0;
    roomItems.forEach((item) => {
      item.style.zIndex = "0";
    });
    point = 0;
  } else NodeStore++;

  roomItems[NodeStore].style.zIndex = `${point + 1}`;
  roomItems[NodeStore].classList.add("slideAnimation");
  setTimeout(
    () => roomItems[NodeStore].classList.remove("slideAnimation"),
    1000
  );
  point++;
};

const init = () => {
  if (changeBtn) changeBtn.addEventListener("click", handleChangeStyle);
  if (changeLeftBtn) changeLeftBtn.addEventListener("click", handleLeft);
  if (changeRightBtn) changeRightBtn.addEventListener("click", handleRight);
};

init();
