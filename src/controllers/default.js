export const rootRoute = (_, res) => {
  return res.status(200).json({
    name: "Shopping Manager",
    version: "1.0.0",
    description: "APIs for managing products within stores",
  });
};
