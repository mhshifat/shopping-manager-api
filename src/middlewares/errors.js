import { env } from "../config";

export const notFoundHandler = (req, res, next) => {
  res.status(404);
  next(new Error(`Requested route '${req.originalUrl}' does not exists 😢`));
};

export const errHandler = (err, req, res, next) => {
  const isJoiErr = err.isJoi || false;
  const code = isJoiErr ? 422 : res.statusCode !== 200 ? res.statusCode : 500;
  return res.status(code).json({
    errorCode: code,
    message: isJoiErr ? "Invalid user inputs" : err.message,
    requestUrl: req.originalUrl,
    ...(isJoiErr ? { errors: err.details } : {}),
    ...(env.inProd ? { stack: err.stack } : {}),
  });
};
