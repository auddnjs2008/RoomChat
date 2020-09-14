import routes from "../routes";
import passport from "passport";
import User from "../Model/User";
import Room from "../Model/Rooms";

export const home = (req, res) => res.render("home", { subtitle: "home" });

export const getJoin = (req, res) => res.render("join", { subtitle: "join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.redirect(routes.join);
  }
  try {
    const user = await User({ name, email });
    await User.register(user, password);

    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { subtitle: "login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const Logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

export const getSearch = (req, res) => {
  res.render("search", { subtitle: "search" });
};

export const postSearch = async (req, res) => {
  const {
    body: { term: searching },
  } = req;

  let findUsers = await User.find({ email: searching });
  let friends = await User.findById(req.user.id).populate("friends");
  // 이미 친구일경우 isFriend가 true여야 한다.
  friends = friends.friends;
  const isFriend = friends.some(
    (friend) => friend.email === findUsers[0].email
  );
  res.render("search", { subtitle: "search", searching, findUsers, isFriend });
};

export const sendMessage = async (req, res) => {
  const {
    body: { sendId },
  } = req;
  //누가  메세지를 보내면 방을 생성해야 한다.
  const array = [];
  array.push(req.user.id);
  array.push(sendId);
  try {
    const newRoom = await Room.create({
      peoples: array,
    });
    newRoom.save();
    const user = await User.findById(req.user.id);
    const sendUser = await User.findById(sendId);
    user.rooms.push(newRoom.id);
    sendUser.rooms.push(newRoom.id);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
