const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Model = require("../../models/modelModel");

module.exports.createModel = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const requestData = JSON.parse(event.body || "{}");
  const { model, ram, memory, color } = requestData;

  try {
    await connectDatabase();

    const newModel = new Model({
      model,
      ram,
      memory,
      color,
    });

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
          message: "Invalid model name format",
        }),
      };
    }

    const regexMemory = /^(16|32|64|128|256|512)$/;
    if (!regexMemory.test(memory)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid memory value",
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

    const existingModel = await Model.findOne({ model, ram, memory, color });
    if (existingModel) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Model with the provided specifications already exists",
        }),
      };
    }

    const savedModel = await newModel.save();

    return {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Allow: "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "*",
      },
      statusCode: 200,
      body: JSON.stringify(savedModel),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong",
        error: error.message,
      }),
    };
  }
};
