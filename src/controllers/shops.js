import { catchAsyncHandler } from "../helpers";
import { ShopModel } from "../models";

export const getShops = catchAsyncHandler(async (req, res, next) => {
  const shops = await ShopModel.find({}).select("-__v");

  return res.status(200).json({
    success: true,
    data: {
      shops,
      total: shops.length,
    },
  });
});

export const createShop = catchAsyncHandler(async (req, res, next) => {
  const isShopExists = await ShopModel.findOne({ name: req.body.name });
  if (isShopExists) {
    res.status(404);
    return next(new Error("Shop already exist"));
  }

  const shop = { ...(await ShopModel.create(req.body))._doc };
  delete shop.__v;

  return res.status(201).json({
    success: true,
    data: shop,
  });
});

export const getShop = catchAsyncHandler(async (req, res, next) => {
  const shopId = req.params.id;
  const existingShop = await ShopModel.findById(shopId).select("-__v");
  if (!existingShop) {
    res.status(404);
    return next(new Error("Shop not found"));
  }

  return res.status(200).json({
    success: true,
    data: existingShop,
  });
});

export const updateShop = catchAsyncHandler(async (req, res, next) => {
  const shopId = req.params.id;
  const existingShop = await ShopModel.findById(shopId).select("-__v");
  if (!existingShop) {
    res.status(404);
    return next(new Error("Shop not found"));
  }

  existingShop.set(req.body);
  await existingShop.save();

  return res.status(200).json({
    success: true,
    data: existingShop,
  });
});

export const deleteShop = catchAsyncHandler(async (req, res, next) => {
  const shopId = req.params.id;
  const existingShop = await ShopModel.findById(shopId).select("-__v");
  if (!existingShop) {
    res.status(404);
    return next(new Error("Shop not found"));
  }
  await existingShop.remove();

  return res.status(200).json({
    success: true,
    data: existingShop,
  });
});
