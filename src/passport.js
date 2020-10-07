import passport from "passport";
import User from "./Model/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); // 쿠키에  유저 아이디만 담아라
passport.deserializeUser(User.deserializeUser()); // 쿠키의 정보를 어떻게 사용자로 전환하는가
