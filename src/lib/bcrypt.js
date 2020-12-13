import bcrypt from "bcryptjs";

export const hashPassword = async (password) => bcrypt.hash(password, 12);
export const isMatchedPass = async (password, hash) =>
  bcrypt.compare(password, hash);
