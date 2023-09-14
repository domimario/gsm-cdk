const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Brand = require("../../models/brandModel");

module.exports.deleteBrand = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const id = event.pathParameters.id;

    const existingBrand = await Brand.findById(id);
    if (!existingBrand) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Could not find brand or brand does not exist",
        }),
      };
    }

    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
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
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify({
        message: "Brand deleted successfully",
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
