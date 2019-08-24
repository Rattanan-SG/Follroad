require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: 3005,
    notification_api: env.NOTIFICATION_API,
    direction_record_api: env.DIRECTION_RECORD_API,
    sqs_queue_url: env.SQS_QUEUE_URL
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3005,
    notification_api: env.NOTIFICATION_API,
    direction_record_api: env.DIRECTION_RECORD_API,
    sqs_queue_url: env.SQS_QUEUE_URL
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3005,
    notification_api: env.NOTIFICATION_API,
    direction_record_api: env.DIRECTION_RECORD_API,
    sqs_queue_url: env.SQS_QUEUE_URL
  }
};

module.exports = config[state];