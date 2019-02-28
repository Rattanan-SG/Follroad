// const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//     host: "myprojectwithmariadb.c0dowco2jq5a.ap-southeast-1.rds.amazonaws.com",
//     user: "Follroad24",
//     password: "Follroad#24"
// });

async function asyncFunction() {
    let conn;
    try {
        conn = await pool.getConnection();
        const test = await conn.query("SELECT * FROM event");
        console.log(test);
    } catch(err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

var mariadb = require('mariadb');

const connection = mariadb.createPool({
    host: "myprojectwithmariadb.c0dowco2jq5a.ap-southeast-1.rds.amazonaws.com",
    user: "Follroad",
    password: "Follroad#24",
    database: "follroad2",
    port: 3306
});

connection.getConnection()
    .then(conn => {
    
      conn.query("SELECT * from event")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before 
          // " CREATE TABLE myTable (id int, val varchar(255)) "
        })
        
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      //not connected
    });
