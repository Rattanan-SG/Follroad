require("dotenv").config();

const { env } = process;
const dbPort = env.DATABASE_PORT || "3306";
const dialect = env.DATABASE_DIALECT || "mariadb";

module.exports = {
  development: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    maxConnectionPool: env.MAX_CONNECTION_POOL || 10,
    port: dbPort,
    dialect
  },
  test: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    maxConnectionPool: env.MAX_CONNECTION_POOL || 10,
    port: dbPort,
    dialect
  },
  production: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    maxConnectionPool: env.MAX_CONNECTION_POOL || 10,
    port: dbPort,
    dialect
  }
};
