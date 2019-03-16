const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE
});

// const connection = mariadb.createPool({
//   host: "myprojectwithmariadb.c0dowco2jq5a.ap-southeast-1.rds.amazonaws.com",
//   user: "Follroad",
//   password: "Follroad#24",
//   database: "follroad2",
//   port: 3306
// });

module.exports = {
  pool
};
