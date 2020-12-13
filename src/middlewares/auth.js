import { decodeToken, isTokenValid } from "../lib";
import { UserModel } from "../models";

export const isLoggedIn = async (req, res, next) => {
  const token = (req.get("Authorization") || "").replace("Bearer ", "");
  if (!token) {
    res.status(401);
    return next(new Error("Invalid access token"));
  }

  const decodedTokenData = decodeToken(token);
  if (!decodedTokenData) {
    res.status(401);
    return next(new Error("Invalid access token"));
  }

  const existingUser = await UserModel.findById(decodedTokenData.uid);
  if (!existingUser) {
    res.status(401);
    return next(new Error("Invalid access token"));
  }

  if (!isTokenValid(token)) {
    res.status(401);
    return next(new Error("Invalid access token"));
  }

  req.authUser = existingUser;
  return next();
};
