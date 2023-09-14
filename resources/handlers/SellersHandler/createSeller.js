const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Seller = require("../../models/sellerModel");

module.exports.createSeller = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const requestData = JSON.parse(event.body || "{}");
  const { sellerName, sellerNipt, location } = requestData;

  try {
    await connectDatabase();

    const newSeller = Seller({
      sellerName,
      sellerNipt,
      location,
    });

    const regex = /^[A-Za-z0-9\s]+$/;
    const regexNipt = /^[A-Z]\d{8}[A-Z]$/;
    const existingSeller = await Seller.findOne({ sellerName }, { sellerNipt });
    const existingSellerName = await Seller.findOne({ sellerName });
    const existingSellerNipt = await Seller.findOne({ sellerNipt });

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

    const seller = await newSeller.save();

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Allow: "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 201,
      body: JSON.stringify(seller),
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
