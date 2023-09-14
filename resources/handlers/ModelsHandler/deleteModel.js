const mongoose = require("mongoose");
const connectDatabase = require("../../database/db");
const Model = require("../../models/modelModel");


module.exports.deleteModel = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    try {
      await connectDatabase();
      const id = event.pathParameters.id;
     
      const existingModel = await Model.findById(id);
      if (!existingModel) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "Could not find model or model does not exist",
          }),
        };
      }

      const deletedModel = await Model.findByIdAndDelete(id);
      if (!deletedModel) {
        return {
          statusCode: 500,
          body: JSON.stringify({
            message: "Failed to delete Model",
          }),
        };
      }
  
      return {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Allow: "GET, OPTIONS, POST, PUT, DELETE",
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "*",
        },
        statusCode: 200,
        body: JSON.stringify({
          message: "Model deleted successfully",
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
