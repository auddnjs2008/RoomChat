import express from "express";
import routes from "../routes";
import {
  home,
  getJoin,
  getSearch,
  getLogin,
  postLogin,
  postJoin,
  Logout,
} from "../Controller/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, Logout);

globalRouter.get(routes.search, getSearch);

export default globalRouter;
