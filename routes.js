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

const routes = {
  home: HOME,
  login: LOGIN,
  logout: LOGOUT,
  join: JOIN,
  search: SEARCH,
  user: USER,
  userfriends: USERFRIENDS,
  userprofile: USERPROFILE,
  userrooms: USERROOMS,
  roomdetail: ROOMDETAIL,
};

export default routes;
