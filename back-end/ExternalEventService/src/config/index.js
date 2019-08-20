require("dotenv").config();

const { env } = process;
const state = env.NODE_ENV || "development";

const config = {
  development: {
    config_id: "development",
    node_port: 3000,
    db_host: "database",
    db_user: "admin",
    db_password: "dev",
    db_database: "dev",
    db_connection_limit: 5
  },
  testing: {
    config_id: "testing"
  },
  staging: {
    config_id: "staging",
    node_port: env.NODE_PORT || 3000,
    db_host: env.DB_HOST,
    db_user: env.DB_USER,
    db_password: env.DB_PASSWORD,
    db_database: env.DB_DATABASE,
    db_connection_limit: env.DB_CONNECTION_LIMIT || 5
  },
  production: {
    config_id: "production",
    node_port: env.NODE_PORT || 3000,
    db_host: env.DB_HOST,
    db_user: env.DB_USER,
    db_password: env.DB_PASSWORD,
    db_database: env.DB_DATABASE,
    db_connection_limit: env.DB_CONNECTION_LIMIT || 5
  }
};

module.exports = config[state];
