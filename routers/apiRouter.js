import express from "express";
import { postAddFriend } from "../Controller/userController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addfriend, postAddFriend);

export default apiRouter;
