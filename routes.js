// Global

const HOME = "/";
const LOGIN = "/login";
const LOGOUT = "/logout";
const JOIN = "/join";
const SEARCH = "/search";

// User
const USER = "/user";
const USERFRIENDS = "/:id";
const USERPROFILE = "/:id/profile";
const EDITPROFILE = "/:id/editprofile";
const USERROOMS = "/:id/chat";
const ROOMDETAIL = "/chat/:roomid";

//API

const API = "/api";
const ADDFriend = "/:id/addfriend";
const MAKERoom = "/makeRoom";

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
  roomdetail: (roomid) => {
    if (roomid) {
      return `/user/chat/${roomid}`;
    } else {
      return ROOMDETAIL;
    }
  },
  api: API,
  addfriend: ADDFriend,
  makeroom: MAKERoom,
};

export default routes;
