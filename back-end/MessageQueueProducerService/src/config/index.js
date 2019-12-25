require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: env.NODE_PORT || 3001,
    aws_access_key_id: env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: env.AWS_SECRET_ACCESS_KEY,
    aws_region: env.AWS_REGION,
    aws_s3_bucket_name: env.AWS_S3_BUCKET_NAME,
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3001,
    aws_access_key_id: env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: env.AWS_SECRET_ACCESS_KEY,
    aws_region: env.AWS_REGION,
    aws_s3_bucket_name: env.AWS_S3_BUCKET_NAME,
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3001,
    aws_access_key_id: env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: env.AWS_SECRET_ACCESS_KEY,
    aws_region: env.AWS_REGION,
    aws_s3_bucket_name: env.AWS_S3_BUCKET_NAME,
  }
};

module.exports = config[state];
