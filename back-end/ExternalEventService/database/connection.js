const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: global.gConfig.db_host,
  user: global.gConfig.db_user,
  password: global.gConfig.db_password,
  database: global.gConfig.db_database
});

module.exports = pool;
