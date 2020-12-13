import { createAdmin } from "../scripts";

export const catchAsyncHandler = (fn) => {
  return (req, res, next) => fn(req, res, next).catch((err) => next(err));
};

export const runScriptHandler = catchAsyncHandler(async () => {
  await createAdmin();
  console.log("📜 Finished running default scripts!");
});
