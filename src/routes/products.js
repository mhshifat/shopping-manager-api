import express from "express";
import { ProductsController } from "../controllers";
import { isAdmin, validationMiddleware } from "../middlewares";
import { newProductSchema, updateQuantitySchema } from "../validators";

const productsRoutes = express.Router();
productsRoutes
  .route("/")
  .get(ProductsController.getProducts)
  .post(
    isAdmin,
    validationMiddleware(newProductSchema),
    ProductsController.createProduct
  );

productsRoutes
  .route("/:id")
  .get(ProductsController.getProduct)
  .put(
    isAdmin,
    validationMiddleware(newProductSchema),
    ProductsController.updateProduct
  )
  .delete(isAdmin, ProductsController.deleteProduct);

productsRoutes
  .route("/:id/quantities")
  .patch(
    validationMiddleware(updateQuantitySchema),
    ProductsController.updateQuantity
  );

export default productsRoutes;
