import express from "express";
import routes from "../routes";
import {
  userFriends,
  userRooms,
  roomDetail,
  userProfile,
  getEditProfile,
  postEditProfile,
  getMakeRoom,
  postMakeRoom,
} from "../Controller/userController";
import { sendMessage } from "../Controller/globalController";
import { imageUpload, roomImageUpload } from "../localMiddleware";

const userRouter = express.Router();

userRouter.get(routes.invite, getMakeRoom);
userRouter.post(routes.invite, roomImageUpload, postMakeRoom);

userRouter.get(routes.userrooms, userRooms);
userRouter.get(routes.userprofile, userProfile);
userRouter.get(routes.editprofile, getEditProfile);
userRouter.post(routes.editprofile, imageUpload, postEditProfile);
userRouter.get(routes.userfriends(), userFriends);
userRouter.get(routes.roomdetail(), roomDetail);

export default userRouter;
