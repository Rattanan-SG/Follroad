require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = {
  development: {
    config_id: "development",
    node_port: 3000,
    db_host: "database",
    db_user: "admin",
    db_password: "test",
    db_database: "events"
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: 3000
  },
  production: {
    config_id: "production",
    node_port: process.env.PORT || 3000,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE
  }
};

module.exports = config[env];
