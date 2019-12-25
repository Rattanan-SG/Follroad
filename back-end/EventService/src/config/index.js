require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: env.NODE_PORT || 3000,
    itic_api: env.ITIC_API || "https://event.longdo.com/feed/json",
    message_queue_api:
      env.MESSAGE_QUEUE_API || "http://message-queue:3001/message-queue/api",
    message_queue_name: env.MESSAGE_QUEUE_NAME || "NewEventNotification-Dev",
    auth0_domain: env.AUTH0_DOMAIN || "sanguo.auth0.com",
    auth0_audience: env.AUTH0_AUDIENCE || "https://follroad.tk"
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
