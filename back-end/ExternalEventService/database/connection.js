const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: global.gConfig.host,
  user: global.gConfig.user,
  password: global.gConfig.password,
  database: global.gConfig.database
});

module.exports = {
  pool
};
