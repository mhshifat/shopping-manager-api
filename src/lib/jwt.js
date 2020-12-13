import jwt from "jsonwebtoken";
import { env } from "../config";

export const generateToken = (user) => {
  const payload = Object.freeze({
    uid: user._id,
    createdAt: Date.now(),
  });

  return jwt.sign(payload, env.jwt.authSecret, { expiresIn: "1d" });
};

export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    return null;
  }
};

export const isTokenValid = (token) => {
  try {
    return !!jwt.verify(token, env.jwt.authSecret);
  } catch (err) {
    return false;
  }
};
