import Joi from "joi";
import { env } from "../config";

export const newProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  image: Joi.string().uri().required(),
  shops: Joi.array().items(Joi.string()),
});

export const updateQuantitySchema = Joi.object({
  [env.store.one]: Joi.number().required(),
  [env.store.two]: Joi.number().required(),
  [env.store.three]: Joi.number().required(),
});
