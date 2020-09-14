import express from "express";
import { sendMessage } from "../Controller/globalController";
import { postAddFriend } from "../Controller/userController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addfriend, postAddFriend);
apiRouter.post(routes.makeroom, sendMessage);
export default apiRouter;
