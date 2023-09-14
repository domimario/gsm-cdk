const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Brand = require("../../models/brandModel");
const Model = require("../../models/modelModel");

module.exports.getAllBrands = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();

    const brand = await Brand.find().populate("models");
    if (brand.length == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Not brands  found ." }),
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
      body: JSON.stringify(brand),
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
