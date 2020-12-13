import { env } from "../config";

export const isAdmin = async (req, res, next) => {
  if (
    req.authUser &&
    req.authUser.username === env.admin.username &&
    req.authUser.email === env.admin.email
  ) {
    return next();
  } else {
    res.status(403);
    return next(new Error("Not accessible"));
  }
};
