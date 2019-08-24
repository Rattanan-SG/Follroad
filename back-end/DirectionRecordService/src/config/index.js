require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: 3003,
    mongo_url: env.MONGO_URL || "mongodb://mongodb/test"
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3003,
    mongo_url: env.MONGO_URL
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3003,
    mongo_url: env.MONGO_URL
  }
};

module.exports = config[state];
