const roomContainer = document.querySelectorAll(".roomContainer");

const init = () => {
  const socket = io("/");
  socket.on("showMessage", ({ showMessage, roomSocket }) => {
    roomContainer.forEach((room) => {
      if (room.href.split("chat/")[1] === roomSocket) {
        const span = room.querySelector(".showMessage");
        const fixedMessage =
          showMessage.length > 15
            ? showMessage.slice(0, 14) + "....."
            : showMessage;

        console.log(fixedMessage);
        span.innerHTML = fixedMessage;
      }
    });
  });
};

init();
