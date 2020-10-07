import express from "express";
import { sendMessage } from "../Controller/globalController";
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
export default apiRouter;
