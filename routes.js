// Global

const HOME = "/";
const LOGIN = "/login";
const LOGOUT = "/logout";
const JOIN = "/join";
const SEARCH = "/search";

// User
const USER = "/user";
const MAKEROOMDETAIL = "/makeroomdetail";
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

const routes = {
  home: HOME,
  login: LOGIN,
  logout: LOGOUT,
  join: JOIN,
  search: SEARCH,
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
  roomdetail: (id, roomid) => {
    if (roomid && id) {
      return `/user/${id}/chat/${roomid}`;
    } else {
      return ROOMDETAIL;
    }
  },
  makeroomdetail: MAKEROOMDETAIL,
  api: API,
  addfriend: ADDFriend,
  makeroom: MAKERoom,
  roommessage: ROOMMESSAGE,
};

export default routes;
