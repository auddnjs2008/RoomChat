import Room from "./Model/Rooms";
import app from "./server";
const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  //login한 유저가 친구한명한테 메세지 보내기
  socket.on("sendBtn", async ({ sendId }) => {
    const peoples = [app.locals.user, sendId];
    const findRooms = await Room.find({ peoples });
    socket.emit("sendBtn", { id: findRooms[0].id });
  });
};

export default socketController;
