const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shop", shopSchema);
