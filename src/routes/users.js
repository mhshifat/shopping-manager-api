import express from "express";
import { UsersController } from "../controllers";
import { validationMiddleware } from "../middlewares";
import { newUserSchema, updateUserSchema } from "../validators";

const usersRoutes = express.Router();
usersRoutes
  .route("/")
  .get(UsersController.getUsers)
  .post(validationMiddleware(newUserSchema), UsersController.createUser);

usersRoutes
  .route("/:id")
  .get(UsersController.getUser)
  .put(validationMiddleware(updateUserSchema), UsersController.updateUser)
  .delete(UsersController.deleteUser);

export default usersRoutes;
