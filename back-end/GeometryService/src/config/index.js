require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: 3005,
    notification_api: env.NOTIFICATION_API,
    direction_record_api: env.DIRECTION_RECORD_API,
    aws_access_key: env.AWS_ACCESS_KEY,
    aws_secet_access_key: env.AWS_SECET_ACCESS_KEY,
    aws_region: env.AWS_REGION
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3005,
    notification_api: env.NOTIFICATION_API,
    direction_record_api: env.DIRECTION_RECORD_API,
    aws_access_key: env.AWS_ACCESS_KEY,
    aws_secet_access_key: env.AWS_SECET_ACCESS_KEY,
    aws_region: env.AWS_REGION
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3005,
    notification_api: env.NOTIFICATION_API,
    direction_record_api: env.DIRECTION_RECORD_API,
    aws_access_key: env.AWS_ACCESS_KEY,
    aws_secet_access_key: env.AWS_SECET_ACCESS_KEY,
    aws_region: env.AWS_REGION
  }
};

module.exports = config[state];
