const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Seller = require("../../models/sellerModel");
const Model = require("../../models/modelModel");

module.exports.getAllSellers = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();

    const seller = await Seller.find().populate("models");

    if (seller.length == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Not sellers found ." }),
      };
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
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "something went wrong",
      }),
    };
  }
};
