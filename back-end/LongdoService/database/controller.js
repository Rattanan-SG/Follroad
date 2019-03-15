const connection = require("./connection");

function getEvents() {
  return connection.dbpool
    .getConnection()
    .then(conn => {
      return conn
        .query("SELECT * from external_events ORDER BY start DESC")
        .then(rows => {
          conn.end();
          return rows;
        })
        .catch(err => {
          console.log(err);
          conn.end();
        });
    })
    .catch(err => {
      console.log(err);
    });
}

async function insertEvents(events) {
  const conn = await connection.dbpool.getConnection();
  conn.beginTransaction();
  conn
    .batch(
      "INSERT INTO external_events(eid, title, title_en, description, description_en, type, longitude, latitude, start, stop, contributor, icon) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      events
    )
    .then(response => {
      // console.log(response);
      conn.commit();
      conn.end();
      return response;
    })
    .catch(err => {
      conn.end();
      throw err;
    });
}

module.exports = {
  getEvents,
  insertEvents
};
