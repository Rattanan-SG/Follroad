const AWS = require("aws-sdk");

const credentials = new AWS.Credentials(
  global.gConfig.aws_access_key,
  global.gConfig.aws_secet_access_key
);

AWS.config.credentials = credentials;
AWS.config.update({ region: global.gConfig.aws_region });

module.exports = AWS;
