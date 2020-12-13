import express from "express";
import { isAdmin, isLoggedIn } from "../middlewares";

const routes = express.Router();
routes.use("/", require("./default").default);
routes.use("/auth", require("./auth").default);
routes.use("/shops", isLoggedIn, isAdmin, require("./shops").default);
routes.use("/users", isLoggedIn, isAdmin, require("./users").default);
routes.use("/products", isLoggedIn, require("./products").default);

export default routes;
