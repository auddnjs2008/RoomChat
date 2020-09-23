import Room from "./Model/Rooms";
import Message from "./Model/Message";
import User from "./Model/User";

import app from "./server";

let roomSocket;

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
    console.log("메세지 받았당 서버에서");
    const Chat = await Message.create({
      people: userId,
      message,
    });
    const room = await Room.findById(roomID);
    const user = await User.findById(userId);
    room.messages.push(Chat.id);
    room.save();

    io.sockets.in(roomSocket).emit("receiveMessage", {
      message,
      name: user ? user.name : "",
      avatarUrl: user ? user.avatarUrl : "",
    });

    // broadcast("receiveMessage", {
    //   message,
    //   name: user ? user.name : "",
    //   avatarUrl: user ? user.avatarUrl : "",
    // });
  });

  socket.on("enterRoom", ({ roomId }) => {
    roomSocket = roomId;
    socket.room = roomId;
    socket.join(roomId);
  });
};

export default socketController;
