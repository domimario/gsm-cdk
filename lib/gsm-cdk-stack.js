const cdk = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const my_lambda = require("./my_lambda");

class GsmCdkStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new my_lambda.MyLambda(this, "my_lambda");
  }
}

module.exports = { GsmCdkStack };
