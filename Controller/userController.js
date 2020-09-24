import User from "../Model/User";
import Room from "../Model/Rooms";
import Message from "../Model/Message";
import routes from "../routes";
import app from "../server";

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
    const fixedRooms = rooms[0].rooms;
    const realRooms = fixedRooms.peoples;
    res.render("userrooms", { subtitle: "rooms", fixedRooms });
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
    console.log(messages);
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
  res.render("profile", { subtitle: "Profile", user });
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { subtitle: "EditProfile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, message },
    files: { avatar, background },
  } = req;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name: name ? name : req.user.name,
      message: message ? message : "No message",
      avatarUrl: avatar ? avatar[0].path : req.user.avatarUrl,
      backgroundUrl: background ? background[0].path : req.user.backgroundUrl,
    });
    console.log(user);
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
