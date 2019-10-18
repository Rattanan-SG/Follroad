require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: env.NODE_PORT || 3000,
    itic_api: env.ITIC_API,
    message_queue_api: env.MESSAGE_QUEUE_API,
    message_queue_name: env.MESSAGE_QUEUE_NAME,
    auth0_domain: env.AUTH0_DOMAIN,
    auth0_audience: env.AUTH0_AUDIENCE
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3000,
    itic_api: env.ITIC_API,
    message_queue_api: env.MESSAGE_QUEUE_API,
    message_queue_name: env.MESSAGE_QUEUE_NAME,
    auth0_domain: env.AUTH0_DOMAIN,
    auth0_audience: env.AUTH0_AUDIENCE
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3000,
    itic_api: env.ITIC_API,
    message_queue_api: env.MESSAGE_QUEUE_API,
    message_queue_name: env.MESSAGE_QUEUE_NAME,
    auth0_domain: env.AUTH0_DOMAIN,
    auth0_audience: env.AUTH0_AUDIENCE
  }
};

module.exports = config[state];
