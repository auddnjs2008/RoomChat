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
  postSearch,
  boardHome,
  getUpload,
  postUpload,
  getPostDetail,
  getPostEdit,
  postPostEdit,
} from "../Controller/globalController";

import { multipleImage } from "../localMiddleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, Logout);

globalRouter.get(routes.search, getSearch);
globalRouter.post(routes.search, postSearch);

globalRouter.get(routes.board, boardHome);

globalRouter.get(routes.upload, getUpload);
globalRouter.post(routes.upload, multipleImage, postUpload);

globalRouter.get(routes.post, getPostDetail);

globalRouter.get(routes.postedit, getPostEdit);
globalRouter.post(routes.postedit, postPostEdit);
export default globalRouter;
