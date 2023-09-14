const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Brand = require("../../models/brandModel");
const Model = require("../../models/modelModel");

module.exports.getBrandById = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    console.log("After connectDatabase ");
    const brand = await Brand.findById(event.pathParameters.id).populate(
      "models"
    );
    console.log(brand);

    if (!brand) {
      return Responses._404({
        message: "Brand is not found or does not exist",
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
      body: JSON.stringify(brand),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "something went wrong",
      }),
    };
  }
};
