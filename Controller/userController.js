import User from "../Model/User";

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
    const rooms = await User.findById(id).populate("rooms");
    res.render("userrooms", { subtitle: "rooms", rooms });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const roomDetail = (req, res) =>
  res.render("roomdetail", { subtitle: "roomDetail" });

export const userProfile = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id);
  res.render("profile", { subtitle: "Profile", user });
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
