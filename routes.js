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
const USERROOMS = "/:id/chat";
const ROOMDETAIL = "/:id/chat/:roomid";

//API

const API = "/api";
const ADDFriend = "/:id/addfriend";

const routes = {
  home: HOME,
  login: LOGIN,
  logout: LOGOUT,
  join: JOIN,
  search: SEARCH,
  user: USER,
  userfriends: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USERFRIENDS;
    }
  },
  userprofile: USERPROFILE,
  userrooms: USERROOMS,
  roomdetail: ROOMDETAIL,
  api: API,
  addfriend: ADDFriend,
};

export default routes;
