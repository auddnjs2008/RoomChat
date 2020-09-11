export const localMiddleware = (req, res, next) => {
  res.locals.loggedUser = req.user || null;
  next();
};
