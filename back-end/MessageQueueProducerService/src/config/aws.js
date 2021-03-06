const AWS = require("aws-sdk");

const credentials = new AWS.Credentials(
  global.gConfig.aws_access_key_id,
  global.gConfig.aws_secret_access_key
);

AWS.config.credentials = credentials;
AWS.config.update({ region: global.gConfig.aws_region });

module.exports = AWS;
