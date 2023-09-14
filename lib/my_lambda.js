const cdk = require("aws-cdk-lib");
const { Construct } = require("constructs");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const path = require("path");

const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");

class MyLambda extends Construct {
  constructor(scope, id) {
    super(scope, id);

    // BRANDS FUNCTIONS --------------------------------

    const createBrand = new NodejsFunction(this, "CreateBrand", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/BrandsHandler/createBrand.js"
      ),
      handler: "createBrand",
    });

    const deleteBrand = new NodejsFunction(this, "DeleteBrand", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/BrandsHandler/deleteBrand.js"
      ),
      handler: "deleteBrand",
    });

    const getAllBrands = new NodejsFunction(this, "GetAllBrands", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/BrandsHandler/getAllBrands.js"
      ),
      handler: "getAllBrands",
    });

    const getBrandById = new NodejsFunction(this, "GetBrandById", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/BrandsHandler/getBrandById.js"
      ),
      handler: "getBrandById",
    });

    const updateBrand = new NodejsFunction(this, "UpdateBrand", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/BrandsHandler/updateBrand.js"
      ),
      handler: "updateBrand",
    });

    // SELLERS FUNCTIONS --------------------------------

    const createSeller = new NodejsFunction(this, "CreateSeller", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/SellersHandler/createSeller.js"
      ),
      handler: "createSeller",
    });

    const deleteSeller = new NodejsFunction(this, "DeleteSeller", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/SellersHandler/deleteSeller.js"
      ),
      handler: "deleteSeller",
    });

    const getAllSellers = new NodejsFunction(this, "GetAllSellers", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/SellersHandler/getAllSellers.js"
      ),
      handler: "getAllSellers",
    });

    const getSellerById = new NodejsFunction(this, "GetSellerById", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/SellersHandler/getSellerById.js"
      ),
      handler: "getSellerById",
    });

    const updateSeller = new NodejsFunction(this, "UpdateSeller", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/SellersHandler/updateSeller.js"
      ),
      handler: "updateSeller",
    });

    // MODELS FUNCTIONS --------------------------------

    const createModel = new NodejsFunction(this, "CreateModel", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/ModelsHandler/createModel.js"
      ),
      handler: "createModel",
    });

    const deleteModel = new NodejsFunction(this, "DeleteModel", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/ModelsHandler/deleteModel.js"
      ),
      handler: "deleteModel",
    });

    const getAllModels = new NodejsFunction(this, "GetAllModels", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/ModelsHandler/getAllModels.js"
      ),
      handler: "getAllModels",
    });

    const getModelById = new NodejsFunction(this, "GetModelById", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/ModelsHandler/getModelById.js"
      ),
      handler: "getModelById",
    });

    const updateModel = new NodejsFunction(this, "UpdateModel", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      entry: path.join(
        __dirname,
        "../resources/handlers/ModelsHandler/updateModel.js"
      ),
      handler: "updateModel",
    });

    const api = new apigateway.RestApi(this, "Api", {
      restApiName: "gsm-api-cdk",
      description: "GSM API FROM CDK",
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Authorization"],
      },
    });

    // const customResource = new apigateway.Resource(this, "CustomResource", {
    //   parent: api.root,
    //   pathPart: "espcharts",
    // });

    //

    api.root
      .addResource("create-brand")
      .addMethod("POST", new apigateway.LambdaIntegration(createBrand));

    api.root
      .addResource("delete-brand")
      .addResource("{id}")
      .addMethod("DELETE", new apigateway.LambdaIntegration(deleteBrand));

    api.root
      .addResource("all-brands")
      .addMethod("GET", new apigateway.LambdaIntegration(getAllBrands));

    api.root
      .addResource("brands")
      .addResource("{id}")
      .addMethod("GET", new apigateway.LambdaIntegration(getBrandById));

    api.root
      .addResource("update-brand")
      .addResource("{id}")
      .addMethod("PUT", new apigateway.LambdaIntegration(updateBrand));

    //------Model----------

    api.root
      .addResource("create-model")
      .addMethod("POST", new apigateway.LambdaIntegration(createModel));

    api.root
      .addResource("delete-model")
      .addResource("{id}")
      .addMethod("DELETE", new apigateway.LambdaIntegration(deleteModel));

    api.root
      .addResource("all-models")
      .addMethod("GET", new apigateway.LambdaIntegration(getAllModels));

    api.root
      .addResource("model")
      .addResource("{id}")
      .addMethod("GET", new apigateway.LambdaIntegration(getModelById));

    api.root
      .addResource("update-model")
      .addResource("{id}")
      .addMethod("PUT", new apigateway.LambdaIntegration(updateModel));

    //--------SELERS -------------


    api.root
    .addResource("create-seller")
    .addMethod("POST", new apigateway.LambdaIntegration(createSeller));

  api.root
    .addResource("delete-seller")
    .addResource("{id}")
    .addMethod("DELETE", new apigateway.LambdaIntegration(deleteSeller));

  api.root
    .addResource("all-sellers")
    .addMethod("GET", new apigateway.LambdaIntegration(getAllSellers));

  api.root
    .addResource("seller")
    .addResource("{id}")
    .addMethod("GET", new apigateway.LambdaIntegration(getSellerById));

  api.root
    .addResource("update-seller")
    .addResource("{id}")
    .addMethod("PUT", new apigateway.LambdaIntegration(updateSeller));
  }
}

module.exports = { MyLambda };
