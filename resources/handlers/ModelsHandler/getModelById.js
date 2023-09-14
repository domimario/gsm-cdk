const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Model = require("../../models/modelModel");

module.exports.getModelById = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const model = await Model.findById(event.pathParameters.id);

    if (!model) {
      return Responses._404({
        message: "Model is not found or does not exist",
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
      body: JSON.stringify(model),
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "something went wrong",
      }),
    };
  }
};
