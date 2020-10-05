import multer from "multer";
import app from "./server";

const Images = multer({ dest: "uploads/images" });

export const roomImageUpload = Images.single("roombackground");
export const imageUpload = Images.fields([
  { name: "avatar", maxCount: 1 },
  { name: "background", maxCount: 1 },
]);

export const localMiddleware = (req, res, next) => {
  res.locals.loggedUser = req.user || null;
  if (req.user) app.locals.user = req.user.id || null;
  next();
};
