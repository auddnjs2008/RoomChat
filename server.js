import "./db";
import "./Model/User";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";

import "./passport";
import { localMiddleware } from "./localMiddleware";

dotenv.config();

const app = express();
const CokieStore = MongoStore(session);

const Port = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${Port}`);
};

app.set("view engine", "pug");
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session()); // 이미 로그인에 성공했으면 세션에는 로그인정보가 남아있다.
// 이걸 단서로 데이터베이스에 있는 유저를 찾아 req.user에 할당
app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.user, userRouter);
app.listen(Port, handleListening);
