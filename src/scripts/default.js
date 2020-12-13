import { env } from "../config";
import { hashPassword } from "../lib";
import { UserModel } from "../models";

const ADMIN_DATA = {
  username: env.admin.username,
  email: env.admin.email,
};

export const createAdmin = async () => {
  const adminUser = await UserModel.findOne(ADMIN_DATA);
  if (adminUser) return console.log("👌 Admin account already exist!");
  ADMIN_DATA.password = await hashPassword(env.admin.password);
  await UserModel.create(ADMIN_DATA);
  console.log("✔ Admin account created!");
};
