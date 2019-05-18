require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    config_id: "development",
    node_port: 9000,
    external_event_url: "http://external-event:3000/api/external-event"
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: 9000
  },
  production: {
    config_id: "production",
    node_port: process.env.PORT || 9000,
    external_event_url: process.env.EXTERNAL_EVENT_URL
  }
};

module.exports = config[env];
