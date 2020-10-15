import User from "../Model/User";
import Room from "../Model/Rooms";
import Message from "../Model/Message";
import routes from "../routes";
import app from "../server";
import userRouter from "../routers/userRouter";

export const userFriends = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    let friends = await User.findById(id).populate("friends");
    friends = friends.friends;
    res.render("userfriends", { subtitle: "friends", friends });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const userRooms = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const rooms = await User.find({ _id: id }).populate({
      path: "rooms",
      populate: { path: "peoples" },
    });
    let lastMessages = await User.find({ _id: id }).populate({
      path: "rooms",
      populate: { path: "messages" },
    });
    const fixedRooms = rooms[0].rooms;
    lastMessages = lastMessages[0].rooms;
    res.render("userrooms", { subtitle: "rooms", fixedRooms, lastMessages });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const roomDetail = async (req, res) => {
  const {
    params: { roomid },
  } = req;

  try {
    const room = await Room.find({ _id: roomid }).populate({
      path: "messages",
      populate: { path: "people" },
    });
    const messages = room[0].messages;

    if (messages.length > 500)
      await Room.findByIdAndUpdate({ _id: roomid }, { messages: [] });

    res.render("roomdetail", { subtitle: "roomDetail", room, messages });
  } catch (error) {
    console.log(error);
  }
};

export const userProfile = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id);
  const reqUser = await User.findById(req.user.id);
  const isFriend = reqUser.friends.includes(user.id);
  res.render("profile", { subtitle: "Profile", user, isFriend });
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { subtitle: "EditProfile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, message },
    files: { avatar, background },
  } = req;
  console.log(req.files);

  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name: name ? name : req.user.name,
      message: message ? message : req.user.message,
      avatarUrl: avatar ? avatar[0].location : req.user.avatarUrl,
      backgroundUrl: background
        ? background[0].location
        : req.user.backgroundUrl,
    });

    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
  }
};

export const postAddFriend = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(req.user.id);
    user.friends.push(id);
    user.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const postMessage = async (req, res) => {
  const {
    body: { id, message },
  } = req;

  try {
    const Chat = await Message.create({
      people: app.locals.user,
      message,
    });

    const room = await Room.findById(id);
    room.messages.push(Chat.id);
    room.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const getMakeRoom = async (req, res) => {
  const user = await User.findById(req.user.id).populate("friends");

  res.render("makeRoom", { subtitle: "makeRoom", friends: user.friends });
};

export const postMakeRoom = async (req, res) => {
  const {
    body: { roomName, plusfriend },
    file,
  } = req;

  try {
    let peoples = plusfriend;
    if (typeof peoples !== "string") peoples.push(`${req.user.id}`);
    else peoples = [plusfriend, req.user.id];
    const newRoom = await Room.create({
      avatarUrl: file ? file.location : "",
      title: roomName ? roomName : "",
      peoples,
    });

    for (let i = 0; i < peoples.length; i++) {
      const user = await User.findById(peoples[i]);
      user.rooms.push(newRoom.id);
      user.save();
    }

    res.redirect(`/user/${req.user.id}/chat`);
  } catch (error) {
    console.log(error);
    res.redirect("/user/invite");
  }
};


export const postChatOut = async (req,res) =>{
  const{
    body:{ userId,roomId}
  }=req;
  const user = await User.findById(userId);
  const room = await Room.findById(roomId);
  // user의 room 에서 빼주고 
  let newuserRooms = user.rooms.filter(item => String(item) !== roomId);
  await User.findOneAndUpdate({_id:userId},{rooms:newuserRooms});
  
  // room의 사용자 목록에서 user목록 빼준다.
  let newroomPeople = room.peoples.filter(item => String(item) !==userId);
 
  //만일 room의 사람들이  0명이면  room을 삭제한다.
  if(newroomPeople.length !== 0)
    await Room.findOneAndUpdate({_id:roomId},{peoples:newroomPeople});  
  else
    await Room.findByIdAndRemove(roomId);
  
}

export const postFriendOut =async (req,res) =>{
  const{
    body:{userId}
  }=req;
  const user = await User.findById(req.user.id);
  console.log(user.friends.includes(userId));
  let newFriends = user.friends.filter(friend=>String(friend) !== userId);
  
  await User.findOneAndUpdate({_id:req.user.id},{friends:newFriends});
}