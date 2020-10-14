import routes from "../routes";
import passport from "passport";
import User from "../Model/User";
import Room from "../Model/Rooms";
import Post from "../Model/Post";
import Comment from "../Model/Comment";
import app from "../server";

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
  let isFriend = false;
  // 이미 친구일경우 isFriend가 true여야 한다.
  // 자기 자신일 경우에도 true 여야 한다.
  friends = friends.friends;
  if (findUsers.length !== 0) {
    isFriend = friends.some((friend) => {
      const Myfriend = friend.email === findUsers[0].email;
      const IsMe = req.user.id === findUsers[0].id;
      if (IsMe === true || Myfriend === true) return true;
    });
  }
  res.render("search", { subtitle: "search", searching, findUsers, isFriend });
};

export const sendMessage = async (req, res) => {
  const {
    body: { sendId },
  } = req;
  //누가  메세지를 보내면 방을 생성해야 한다.
  const array = [req.user.id, sendId];
  const array2 = [sendId, req.user.id];
  try {
    //이미 있는 방이면 생성하지 않는다.
    const isRoom = await Room.find({ peoples: array });
    const isRoom2 = await Room.find({ peoples: array2 });

    if (isRoom.length === 0 && isRoom2.length === 0) {
      const newRoom = await Room.create({
        peoples: array,
      });
      newRoom.save();
      const user = await User.findById(req.user.id);
      const sendUser = await User.findById(sendId);
      user.rooms.push(newRoom.id);
      user.save();
      sendUser.rooms.push(newRoom.id);
      sendUser.save();
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const boardHome = async (req, res) => {
  const {
    query: { page },
  } = req;
  let realPage = parseInt(page);

  const allPostes = await Post.find({}).sort({ _id: -1 });
  // 1페이지당 게시물 5개  5페이지 씩 묶음
  const allNumber = allPostes.length;
  const fivePostes = parseInt(allNumber / 5);

  const allPageNumber = allNumber % 5 ? fivePostes + 1 : fivePostes;

  //5페이지씩 묶음의 개수
  let BundleNumber = parseInt(allNumber / 25) + 1;
  if (allNumber % 25 === 0) BundleNumber = BundleNumber - 1;

  // 현재 번들
  let nowBundle = parseInt(realPage / 5) + 1;
  if (realPage % 5 === 0) nowBundle = nowBundle - 1;

  let startIndex = 5 * nowBundle - 4;
  let finishIndex = startIndex + 5;
  if (finishIndex > allPageNumber) finishIndex = allPageNumber + 1;

  const nowPage = await Post.find({})
    .sort({ _id: -1 })
    .skip(realPage * 5 - 5)
    .limit(5)
    .populate("creator");

  res.render("board", {
    subtitle: "Board",
    allPostes,
    nowPage,
    BundleNumber,
    nowBundle,
    startIndex,
    finishIndex,
    page: realPage,
  });
};

export const getUpload = (req, res) => {
  res.render("upload", { subtitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, content },
    files,
  } = req;
  //files 배열에  각각요소의  item.location에 위치url

  const imageUrls = files.map((item) => item.location);
  const uploadUser = await User.findById(req.user.id);
  const Day = new Date();
  const Month = Day.getMonth() + 1;
  const date = Day.getDate();
  Day.setHours(Day.getHours() + 9);
  const DBDay = `${Day.getFullYear()}-${Month < 10 ? `0${Month}` : Month}-${
    date < 10 ? `0${date}` : date
  }`;
  try {
    const newPost = await Post.create({
      creator: req.user.id,
      title,
      content,
      imageUrls,
      time: DBDay,
    });
    uploadUser.posts.push(newPost);
    uploadUser.save();
    res.redirect("/board");
  } catch (error) {
    console.log(error);
    res.redirect("/board/upload");
  }
};

export const getPostDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  const post = await Post.findById(id).populate("creator").populate("comments");
  const comment = await Post.findById(id).populate({
    path: "comments",
    populate: { path: "creator" },
  });

  res.render("postDetail", {
    subtitle: "postDetail",
    post,
    commentes: comment.comments,
    user: req.user.id,
  });
};

export const postAddComment = async (req, res) => {
  const {
    body: { comment, postId },
  } = req;
  try {
    const newComment = await Comment.create({
      creator: req.user.id,
      message: comment,
    });
    const nowPost = await Post.findById(postId);
    nowPost.comments.push(newComment.id);
    nowPost.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDelete = async (req, res) => {
  const {
    body: { postId },
  } = req;
  try {
    await Post.findOneAndRemove({ _id: postId });
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const getPostEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const post = await Post.findById(id);
    res.render("postEdit", { subtitle: "postEdit", post });
  } catch (error) {
    console.log(error);
    res.redirect(`/board/${id}/edit`);
  }
};

export const postPostEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, content },
  } = req;
  try {
    await Post.findOneAndUpdate({ _id: id }, { title, content });
    res.redirect(`/board/${id}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/board/${id}/edit`);
    s;
  }
};

export const getEmailShare = async (req, res) => {
  const emailUser = await User.find({ emailShare: true });

  res.render("emailShare", { subtitle: "emailShare", Useres: emailUser });
};

export const emailShareBtn = async (req, res) => {
  try {
    const who = await User.findOneAndUpdate(
      { _id: req.user.id },
      { emailShare: true }
    );
    console.log(who);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const getMypost = async (req, res) => {
  let myPostes = await User.findById(req.user.id)
    .sort({ _id: -1 })
    .populate("posts");
  myPostes = myPostes.posts;
  res.render("mypost", { subtitle: "mypost", postes: myPostes });
};
