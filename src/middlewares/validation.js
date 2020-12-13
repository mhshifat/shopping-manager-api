export const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      next(err);
    }
  };
};
