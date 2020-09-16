import express from "express";
import routes from "../routes";
import {
  userFriends,
  userRooms,
  roomDetail,
  userProfile,
  getEditProfile,
} from "../Controller/userController";
import { sendMessage } from "../Controller/globalController";

const userRouter = express.Router();

userRouter.get(routes.userfriends(), userFriends);
userRouter.get(routes.userrooms, userRooms);
userRouter.get(routes.roomdetail(), roomDetail);
userRouter.get(routes.userprofile, userProfile);
userRouter.get(routes.editprofile, getEditProfile);
export default userRouter;
