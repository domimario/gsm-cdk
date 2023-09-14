const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: [true, "Name is required"],
  },

  brandOrigin: {
    type: String,
    required: [true, "Origin is required"],
  },

  models: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }],
});

module.exports = mongoose.model("Brand", BrandSchema);
