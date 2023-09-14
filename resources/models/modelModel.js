const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],

  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },

  model: { type: String },

  ram: [
    {
      type: Number,
      required: [true, "Ram is required"],
      enum: [3, 4, 5, 6, 8, 12, 16],
    },
  ],

  memory: [
    {
      type: Number,
      required: [true, "Memory is required"],
      enum: [32, 64, 128, 256, 512],
    },
  ],

  color: {
    type: [String],
    required: [true],
  },
});
module.exports = mongoose.model("Model", ModelSchema);
