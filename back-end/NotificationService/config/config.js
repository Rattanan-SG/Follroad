require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    config_id: "development",
    node_port: 3002
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: 3002
  },
  production: {
    config_id: "production",
    node_port: process.env.PORT || 3002
  }
};

module.exports = config[env];
