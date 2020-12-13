import { catchAsyncHandler } from "../helpers";
import { ProductModel } from "../models";

export const getProducts = catchAsyncHandler(async (req, res, next) => {
  const products = await ProductModel.find({}).select("-__v").populate("shops");

  return res.status(200).json({
    success: true,
    data: {
      products,
      total: products.length,
    },
  });
});

export const createProduct = catchAsyncHandler(async (req, res, next) => {
  const product = { ...(await ProductModel.create(req.body))._doc };
  delete product.__v;

  return res.status(201).json({
    success: true,
    data: product,
  });
});

export const getProduct = catchAsyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const existingProduct = await ProductModel.findById(productId).select("-__v");
  if (!existingProduct) {
    res.status(404);
    return next(new Error("Product not found"));
  }

  return res.status(200).json({
    success: true,
    data: existingProduct,
  });
});

export const updateProduct = catchAsyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const existingProduct = await ProductModel.findById(productId).select("-__v");
  if (!existingProduct) {
    res.status(404);
    return next(new Error("Product not found"));
  }
  existingProduct.set(req.body);
  await existingProduct.save();

  return res.status(200).json({
    success: true,
    data: existingProduct,
  });
});

export const deleteProduct = catchAsyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const existingProduct = await ProductModel.findById(productId).select("-__v");
  if (!existingProduct) {
    res.status(404);
    return next(new Error("Product not found"));
  }
  await existingProduct.remove();

  return res.status(200).json({
    success: true,
    data: existingProduct,
  });
});

export const updateQuantity = catchAsyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const existingProduct = await ProductModel.findById(productId).select("-__v");
  if (!existingProduct) {
    res.status(404);
    return next(new Error("Product not found"));
  }
  existingProduct.set("quantities", req.body);
  await existingProduct.save();

  return res.status(200).json({
    success: true,
    data: existingProduct,
  });
});
