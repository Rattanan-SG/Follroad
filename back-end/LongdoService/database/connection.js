const mariadb = require("mariadb");

const dbpool = mariadb.createPool({
  host: "192.168.99.100",
  user: "admin",
  password: "test",
  database: "database",
  port: 3306
});

// const connection = mariadb.createPool({
//   host: "myprojectwithmariadb.c0dowco2jq5a.ap-southeast-1.rds.amazonaws.com",
//   user: "Follroad",
//   password: "Follroad#24",
//   database: "follroad2",
//   port: 3306
// });

module.exports = {
  dbpool
};
