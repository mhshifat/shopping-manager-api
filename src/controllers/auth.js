import { env } from "../config";
import { catchAsyncHandler } from "../helpers";
import {
  decodeToken,
  generateToken,
  isMatchedPass,
  isTokenValid,
} from "../lib";
import { UserModel } from "../models";

export const login = catchAsyncHandler(async (req, res, next) => {
  const existingUser = await UserModel.findOne({
    email: req.body.email,
  }).select("-__v");
  if (!existingUser) {
    res.status(400);
    return next(new Error("Username or password is invalid"));
  }

  const isPwdMatched = await isMatchedPass(
    req.body.password,
    existingUser.password
  );
  if (!isPwdMatched) {
    res.status(400);
    return next(new Error("Username or password is invalid"));
  }

  existingUser.password = undefined;
  return res.status(200).json({
    success: true,
    data: {
      user: existingUser,
      token: generateToken(existingUser),
      isAdmin:
        existingUser.email === env.admin.email &&
        existingUser.username === env.admin.username,
    },
  });
});

export const loginWithToken = catchAsyncHandler(async (req, res, next) => {
  const token = req.body.token;

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

  return res.status(200).json({
    success: true,
    data: {
      user: existingUser,
      isAdmin:
        existingUser.email === env.admin.email &&
        existingUser.username === env.admin.username,
    },
  });
});
