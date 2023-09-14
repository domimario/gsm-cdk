const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  sellerName: {
    type: String,
    required: [true, "Name is required"],
  },
  sellerNipt: {
    type: String,
    required: [true, "Nipt is required"],
  },
  location: {
    type: String,
    required: [true],
  },
  models: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }],
});

module.exports = mongoose.model("Seller", SellerSchema);
