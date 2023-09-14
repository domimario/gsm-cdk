const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Brand = require("../../models/brandModel");

module.exports.updateBrand = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const requestData = JSON.parse(event.body || "{}");
    const { brandName, brandOrigin } = requestData;
    const { id } = event.pathParameters;

    if (!brandName || !brandOrigin) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "All fields must be required",
        }),
      };
    }

    const regex = /^[A-Za-z0-9\s]+$/;
    if (!regex.test(brandName)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid brand name format",
        }),
      };
    }

    
    if (!regex.test(brandOrigin)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid brand origin format",
        }),
      };
    }

    const existingBrandName = await Brand.findOne({ brandName });
    if (existingBrandName) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Brand with the provided name already exists",
        }),
      };
    }



    const brand = await Brand.findByIdAndUpdate(
      id,
      { brandName, brandOrigin },
      { new: true }
    );

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
