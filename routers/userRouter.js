import express from "express";
import routes from "../routes";
import {
  userFriends,
  userRooms,
  roomDetail,
  userProfile,
  getEditProfile,
  postEditProfile,
} from "../Controller/userController";
import { sendMessage } from "../Controller/globalController";
import { imageUpload } from "../localMiddleware";

const userRouter = express.Router();

userRouter.get(routes.userfriends(), userFriends);
userRouter.get(routes.userrooms, userRooms);
userRouter.get(routes.roomdetail(), roomDetail);
userRouter.get(routes.userprofile, userProfile);
userRouter.get(routes.editprofile, getEditProfile);
userRouter.post(routes.editprofile, imageUpload, postEditProfile);

export default userRouter;
