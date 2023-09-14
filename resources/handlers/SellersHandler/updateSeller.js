const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Seller = require("../../models/sellerModel");

module.exports.updateSeller = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const requestData = JSON.parse(event.body || "{}");
    const { sellerName, sellerNipt, location } = requestData;
    const { id } = event.pathParameters;

    const regex = /^[A-Za-z0-9\s]+$/;
    const regexNipt = /^[A-Z]\d{8}[A-Z]$/;
    const existingSeller = await Seller.findOne({ sellerName }, { sellerNipt });
    const existingSellerName = await Seller.findOne({
      _id: { $ne: id }, // Exclude the seller being updated
      sellerName,
    });
    const existingSellerNipt = await Seller.findOne({
      _id: { $ne: id }, // Exclude the seller being updated
      sellerNipt,
    });

    if (!sellerName || !sellerNipt || !location) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "All fields must be required",
        }),
      };
    }

    if (!regex.test(sellerName)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid seller name format",
        }),
      };
    }

    if (!regexNipt.test(sellerNipt)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message:
            "Nipt format not supported , nipt should start with a Letter and finished with a Letter",
        }),
      };
    }

    if (existingSellerName) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Seller with the provided name already exists",
        }),
      };
    }

    if (existingSellerNipt) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Seller with the provided NIPT already exists",
        }),
      };
    }

    if (existingSeller) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Seller with the provided name and NIPT already exists",
        }),
      };
    }

    const seller = await Seller.findByIdAndUpdate(
      id,
      { sellerName, sellerNipt, location },
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
