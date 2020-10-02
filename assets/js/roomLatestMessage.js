const roomContainer = document.querySelectorAll(".roomsOutWrapper");

const init = () => {
  const socket = io("/");
  socket.on("showMessage", ({ showMessage, roomSocket }) => {
    roomContainer.forEach((room) => {
      room.style.order = "0";
      if (room.href.split("chat/")[1] === roomSocket) {
        const span = room.querySelector(".showMessage");
        const fixedMessage =
          showMessage.length > 15
            ? showMessage.slice(0, 14) + "....."
            : showMessage;
        room.style.order = "-1";
        room.classList.add("acceptMessage");
        span.innerHTML = fixedMessage;
        setTimeout(() => room.classList.remove("acceptMessage"), 1000);
      }
    });
  });
};

init();

roomContainer.forEach((room) => console.log(room.href.split("chat/")[1]));
