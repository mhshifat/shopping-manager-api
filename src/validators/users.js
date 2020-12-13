import Joi from "joi";

export const newUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().optional(),
});
