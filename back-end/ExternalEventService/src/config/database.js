const mariadb = require("mariadb");

exports.pool = mariadb.createPool({
  host: global.gConfig.db_host,
  user: global.gConfig.db_user,
  password: global.gConfig.db_password,
  database: global.gConfig.db_database,
  connectionLimit: global.gConfig.db_connection_limit
});
