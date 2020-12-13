import express from "express";
import { ShopsController } from "../controllers";
import { validationMiddleware } from "../middlewares";
import { newShopSchema } from "../validators";

const shopsRoutes = express.Router();
shopsRoutes
  .route("/")
  .get(ShopsController.getShops)
  .post(validationMiddleware(newShopSchema), ShopsController.createShop);

shopsRoutes
  .route("/:id")
  .get(ShopsController.getShop)
  .put(validationMiddleware(newShopSchema), ShopsController.updateShop)
  .delete(ShopsController.deleteShop);

export default shopsRoutes;
