// Global

const HOME = "/";
const LOGIN = "/login";
const LOGOUT = "/logout";
const JOIN = "/join";
const SEARCH = "/search";
const BOARD = "/board";
const UPLOAD = "/board/upload";
const POST = "/board/:id";
const POSTEDIT = "/board/:id/edit";
// User
const USER = "/user";
const INVITE = "/invite";
const USERFRIENDS = "/:id";
const USERPROFILE = "/:id/profile";
const EDITPROFILE = "/:id/editprofile";
const USERROOMS = "/:id/chat";
const ROOMDETAIL = "/:id/chat/:roomid";

//API

const API = "/api";
const ADDFriend = "/:id/addfriend";
const MAKERoom = "/makeRoom";
const ROOMMESSAGE = "/room/messages";
const ADDCOMMENt = "/board/comment";
const POSTDELETE = "/board/delete";
const routes = {
  home: HOME,
  login: LOGIN,
  logout: LOGOUT,
  join: JOIN,
  search: SEARCH,
  board: BOARD,
  post: POST,
  upload: UPLOAD,
  postedit: POSTEDIT,
  user: USER,
  userfriends: (id) => {
    if (id) {
      return `/user/${id}`;
    } else {
      return USERFRIENDS;
    }
  },
  userprofile: USERPROFILE,
  editprofile: EDITPROFILE,
  userrooms: USERROOMS,
  invite: INVITE,
  roomdetail: (id, roomid) => {
    if (roomid && id) {
      return `/user/${id}/chat/${roomid}`;
    } else {
      return ROOMDETAIL;
    }
  },
  api: API,
  addfriend: ADDFriend,
  makeroom: MAKERoom,
  roommessage: ROOMMESSAGE,
  addcomment: ADDCOMMENt,
  postdelete: POSTDELETE,
};

export default routes;
