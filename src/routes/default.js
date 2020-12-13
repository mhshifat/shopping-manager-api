import express from "express";
import { DefaultController } from "../controllers";

const defaultRoutes = express.Router();
defaultRoutes.get("/", DefaultController.rootRoute);

export default defaultRoutes;
