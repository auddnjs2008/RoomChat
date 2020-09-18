import User from "../Model/User";
import routes from "../routes";

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
    res.render("userrooms", { subtitle: "rooms", fixedRooms });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const roomDetail = (req, res) => {
  try {
    res.render("roomdetail", { subtitle: "roomDetail" });
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
