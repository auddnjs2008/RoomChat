import express from "express";
import {
  sendMessage,
  postAddComment,
  postDelete,
  emailShareBtn,
} from "../Controller/globalController";
import {
  chatAddFriend,
  postAddFriend,
  postMessage,
} from "../Controller/userController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addfriend, postAddFriend);
apiRouter.post(routes.makeroom, sendMessage);
apiRouter.post(routes.roommessage, postMessage);
apiRouter.post(routes.addcomment, postAddComment);
apiRouter.post(routes.postdelete, postDelete);
apiRouter.post(routes.sharebtn, emailShareBtn);
export default apiRouter;
