const { initialize } = require("passport");

const roomContainer = document.querySelectorAll(".roomContainer");

const handleRoomEnter = (e) => {
  const roomId = e.target.href.split("chat/")[1];
  const socket = io("/");
  socket.on("connect", () => {
    socket.emit("enterRoom", { roomId });
  });
};

const init = () => {
  roomContainer.forEach((room) =>
    room.addEventListener("click", handleRoomEnter)
  );
};

init();
