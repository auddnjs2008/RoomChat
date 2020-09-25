import Room from "./Model/Rooms";
import Message from "./Model/Message";
import User from "./Model/User";

import app from "./server";

let roomSocket;
let showMessage;
const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  //login한 유저가 친구한명한테 메세지 보내기 버튼 눌렀을떄
  socket.on("sendBtn", async ({ sendId }) => {
    const peoples = [app.locals.user, sendId];
    let findRooms = await Room.find({ peoples });
    if (findRooms.length === 0) {
      findRooms = await Room.find({ peoples: peoples.reverse() });
    }
    socket.emit("sendBtn", { id: findRooms[0].id, userId: app.locals.user });
  });

  // 1. 메세지가 왔을때  메세지 db를 생성하고 room에 저장해준다.
  socket.on("sendMessage", async ({ roomID, message, userId }) => {
    const Chat = await Message.create({
      people: userId,
      message,
    });
    const room = await Room.findById(roomID);
    const user = await User.findById(userId);
    room.messages.push(Chat.id);
    room.save();
    showMessage = message;
    socket.broadcast.to(roomSocket).emit("receiveMessage", {
      message,
      name: user ? user.name : "",
      avatarUrl: user ? user.avatarUrl : "",
    });

    // 메세지가 왔을 때  방 겉에  제일 마지막 메세지를 표시해준다.
    broadcast("showMessage", { showMessage, roomSocket });
  });

  socket.on("enterRoom", ({ roomId }) => {
    roomSocket = roomId;
  });

  socket.on("socketJoin", () => {
    socket.room = roomSocket;
    socket.join(roomSocket);
  });
};

export default socketController;
