import app from "./server";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedUser = req.user || null;
  if (req.user) app.locals.user = req.user.id || null;
  next();
};
