require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: env.NODE_PORT || 3000,
    itic_api: env.ITIC_API,
    message_queue_api: env.MESSAGE_QUEUE_API,
    notification_queue_name: env.NOTIFICATION_QUEUE_NAME
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3000,
    itic_api: env.ITIC_API,
    message_queue_api: env.MESSAGE_QUEUE_API,
    notification_queue_name: env.NOTIFICATION_QUEUE_NAME
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3000,
    itic_api: env.ITIC_API,
    message_queue_api: env.MESSAGE_QUEUE_API,
    notification_queue_name: env.NOTIFICATION_QUEUE_NAME
  }
};

module.exports = config[state];
