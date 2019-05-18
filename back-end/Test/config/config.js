require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    config_id: "development",
    node_port: 9000,
    external_event_host: "external-event:3000"
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: 8080
  },
  production: {
    config_id: "production",
    node_port: process.env.PORT || 8080,
    external_event_host: process.env.EXTERNAL_EVENT_HOST
  }
};

module.exports = config[env];
