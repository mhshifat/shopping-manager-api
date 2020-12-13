import express from "express";
import { AuthController } from "../controllers";
import { validationMiddleware } from "../middlewares";
import { loginSchema } from "../validators";

const authRoutes = express.Router();
authRoutes
  .route("/login")
  .post(validationMiddleware(loginSchema), AuthController.login);

authRoutes.route("/login/token").post(AuthController.loginWithToken);

export default authRoutes;
