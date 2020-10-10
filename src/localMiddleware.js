import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import app from "./server";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-1",
});

const Images = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wewechat/images",
  }),
});

export const roomImageUpload = Images.single("roombackground");
export const imageUpload = Images.fields([
  { name: "avatar", maxCount: 1 },
  { name: "background", maxCount: 1 },
]);

export const multipleImage = Images.array("images", 7);

export const localMiddleware = (req, res, next) => {
  res.locals.loggedUser = req.user || null;
  if (req.user) app.locals.user = req.user.id || null;
  next();
};
