const { initSockets } = require("./socket");

const roomContainer = document.querySelectorAll(".roomsOutWrapper");

const handleRoomEnter = (e) => {
  const roomId = e.target.href.split("chat/")[1];
  console.log(`입장 ${roomId}`);
  const enterSocket = io("/");
  initSockets(enterSocket);
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
