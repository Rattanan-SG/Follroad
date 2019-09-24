require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: env.NODE_PORT || 3003,
    mongo_url: env.MONGO_URL || "mongodb://mongodb/test",
    auth0_domain: env.AUTH0_DOMAIN,
    auth0_audience: env.AUTH0_AUDIENCE
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3003,
    mongo_url: env.MONGO_URL,
    auth0_domain: env.AUTH0_DOMAIN,
    auth0_audience: env.AUTH0_AUDIENCE
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3003,
    mongo_url: env.MONGO_URL,
    auth0_domain: env.AUTH0_DOMAIN,
    auth0_audience: env.AUTH0_AUDIENCE
  }
};

module.exports = config[state];
