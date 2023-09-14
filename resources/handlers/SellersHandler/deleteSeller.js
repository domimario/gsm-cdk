const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Seller = require("../../models/sellerModel");

module.exports.deleteSeller = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const id = event.pathParameters.id;

    const existingSeller = await Seller.findById(id);

    if (!existingSeller) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Could not find seller or seller does not exist",
        }),
      };
    }

    const deletedSeller = await Seller.findByIdAndDelete(id);
    if (!deletedSeller) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Failed to delete seller",
        }),
      };
    }

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Allow: "GET, OPTIONS, POST, PUT, DELETE",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify({
        message: "Seller deleted successfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "something went wrong",
      }),
    };
  }
};
