import express from "express";
import routes from "../routes";
import {
  userFriends,
  userRooms,
  roomDetail,
  userProfile,
} from "../Controller/userController";

const userRouter = express.Router();

userRouter.get(routes.userfriends, userFriends);
userRouter.get(routes.userrooms, userRooms);
userRouter.get(routes.roomdetail, roomDetail);
userRouter.get(routes.userprofile, userProfile);
export default userRouter;
