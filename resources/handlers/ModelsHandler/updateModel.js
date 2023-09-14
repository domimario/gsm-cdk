const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Model = require("../../models/modelModel");

module.exports.updateModel = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDatabase();
    const requestData = JSON.parse(event.body || "{}");
    const { model, ram, memory, color } = requestData;
    const { id } = event.pathParameters;

    if (!model || !ram || !memory || !color) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "All fields must be required",
        }),
      };
    }

    const regex = /^[A-Za-z0-9\s]+$/;
    if (!regex.test(model)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid model name format",
        }),
      };
    }

    const regexRam = /^(2|3|4|6|8|16)$/;
    if (!regexRam.test(ram)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid RAM value format",
        }),
      };
    }

    const regexMemory = /^(16|32|64|128|256|512)$/;
    if (!regexMemory.test(memory)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid memory value format",
        }),
      };
    }

    const regexColor = /^[A-Za-z\s]+$/;
    if (!regexColor.test(color)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid color format",
        }),
      };
    }

    const updatedModel = await Model.findByIdAndUpdate(
      id,
      { model, ram, memory, color },
      { new: true }
    );

    if (!updatedModel) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Model not found",
        }),
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
      body: JSON.stringify(updatedModel),
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
