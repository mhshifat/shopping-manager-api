import { env } from "../config";
import { catchAsyncHandler } from "../helpers";
import { hashPassword } from "../lib";
import { UserModel } from "../models";

export const getUsers = catchAsyncHandler(async (req, res, next) => {
  const users = await UserModel.find({
    username: { $ne: env.admin.username || env.admin.email },
  }).select("-__v -password");

  return res.status(200).json({
    success: true,
    data: users,
  });
});

export const createUser = catchAsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUser = await UserModel.findOne({ username, email }).select(
    "-__v -password"
  );
  if (existingUser) {
    res.status(409);
    return next(new Error("User already exist"));
  }

  req.body.password = await hashPassword(password);
  const user = { ...(await UserModel.create(req.body))._doc };
  delete user.password;
  delete user.__v;

  return res.status(201).json({
    success: true,
    data: user,
  });
});

export const getUser = catchAsyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const existingUser = await UserModel.findById(userId).select(
    "-__v -password"
  );
  if (!existingUser) {
    res.status(404);
    return next(new Error("User not found"));
  }

  return res.status(200).json({
    success: true,
    data: existingUser,
  });
});

export const updateUser = catchAsyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { password } = req.body;
  const existingUser = await UserModel.findById(userId).select(
    "-__v -password"
  );
  if (!existingUser) {
    res.status(404);
    return next(new Error("User not found"));
  }

  if (password) {
    req.body.password = await hashPassword(password);
  }
  existingUser.set(req.body);
  await existingUser.save();
  existingUser.password = undefined;

  return res.status(200).json({
    success: true,
    data: existingUser,
  });
});

export const deleteUser = catchAsyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const existingUser = await UserModel.findById(userId).select(
    "-__v -password"
  );
  if (!existingUser) {
    res.status(404);
    return next(new Error("User not found"));
  }

  await existingUser.remove();
  return res.status(200).json({
    success: true,
    data: existingUser,
  });
});
