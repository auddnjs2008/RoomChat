const { initSockets } = require("./socket");

const roomContainer = document.querySelectorAll(".roomContainer");

const handleRoomEnter = (e) => {
  const roomId = e.target.href.split("chat/")[1];
  const enterSocket = io("/");
  enterSocket.on("connect", () => {
    enterSocket.emit("enterRoom", { roomId });
  });
};

const init = () => {
  roomContainer.forEach((room) =>
    room.addEventListener("click", handleRoomEnter)
  );
};

init();
