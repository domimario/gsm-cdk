const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Seller = require("../../models/sellerModel");
const Model = require("../../models/modelModel");

module.exports.getSellerById = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const seller = await Seller.findById(event.pathParameters.id).populate(
      "models"
    );

    if (!seller) {
      return Responses._404({
        message: "Seller is not found or does not exist",
      });
    }

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Allow: "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(seller),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "something went wrong",
      }),
    };
  }
};
