import Room from "./Model/Rooms";
import Message from "./Model/Message";
import User from "./Model/User";
import app from "./server";
const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  //login한 유저가 친구한명한테 메세지 보내기 버튼 눌렀을떄
  socket.on("sendBtn", async ({ sendId }) => {
    const peoples = [app.locals.user, sendId];
    console.log(peoples);
    const findRooms = await Room.find({ peoples });
    console.log(findRooms);
    socket.emit("sendBtn", { id: findRooms[0].id });
  });

  // 1. 메세지가 왔을때  메세지 db를 생성하고 room에 저장해준다.
  socket.on("sendMessage", async ({ id, message }) => {
    console.log("보낸 메세지");
    console.log(message);
    const Chat = await Message.create({
      people: app.locals.user,
      message,
    });
    const room = await Room.findById(id);
    const user = await User.findById(app.locals.user);
    room.messages.push(Chat.id);
    room.save();

    broadcast("sendMessage", {
      message,
      name: user ? user.name : "",
      avatarUrl: user ? user.avatarUrl : "",
    });
  });
};

export default socketController;
