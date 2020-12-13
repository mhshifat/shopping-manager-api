import { env } from "../config";
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
      },
    ],
    quantities: {
      [env.store.one]: {
        type: Number,
        default: 0,
      },
      [env.store.two]: {
        type: Number,
        default: 0,
      },
      [env.store.three]: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
