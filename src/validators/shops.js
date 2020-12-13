import Joi from "joi";

export const newShopSchema = Joi.object({
  name: Joi.string().required(),
});
