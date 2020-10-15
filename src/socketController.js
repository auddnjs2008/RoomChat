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

  socket.on("chatFindFriend", async ({ findValue, location }) => {
    const room = await Room.findById(location);
    const findFriend = await User.find({ email: findValue });
    let isPeople = false;
    // 찾는 사람이 이미 존재할 경우  true 반환
    if (findFriend.length !== 0)
      isPeople = room.peoples.includes(findFriend[0]._id);

    socket.emit("findFriend", { findFriend, isPeople });
  });

  // 친구초대 됬다는 알림이랑 db에 저장되야한다.
  socket.on("chatPlusFriend", async ({ Friend, location }) => {
    const message = `${Friend[0].name}님이 초대되었습니다`;
    const room = await Room.findById(location);
    //message저장
    const alarmMessage = await Message.create({ message });
    room.messages.push(alarmMessage);
    room.save();
    //room에  찾은 사람 저장

    room.peoples.push(Friend[0]._id);
    room.save();
    //찾은 사람에 이 방 아이디를 저장
    const user = await User.findById(Friend[0]._id);
    user.rooms.push(room.id);
    user.save();
    io.sockets.in(roomSocket).emit("chatPlusFriendAlarm", { message, Friend });
  });

  // 현재 채팅방 사용자 목록 찾기
  socket.on("findList", async ({ location }) => {
    const room = await Room.findById(location).populate("peoples");
    socket.emit("foundList", { peoples: room.peoples });
  });

  // email share 에서 이메일 찾기
  socket.on("findEmail", async () => {
    const user = await User.findById(app.locals.user);
    const userEmail = user.email;
    const userTrue = user.emailShare;
    socket.emit("foundEmail", { email: userEmail, isTrue: userTrue });
  });

  // 채팅방을 나갈때  
  socket.on("chatOut",async ({userId,roomId})=>{
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    
    const outMessage = `${user.name}님이 나갔습니다`;
    const alarmMessage = await Message.create({ message: outMessage });
    room.messages.push(alarmMessage);
    room.save();
    io.sockets.in(roomSocket).emit("chatOutAlarm", {outMessage });
    socket.leave(roomSocket);
  })


};

export default socketController;
