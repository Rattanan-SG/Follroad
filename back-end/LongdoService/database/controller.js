const connection = require("./connection");

function getEvents() {
  return connection.pool
    .getConnection()
    .then(conn => {
      return conn
        .query(
          "SELECT eid, title, title_en, description, description_en, latitude, longitude, type, DATE_FORMAT(start, '%Y-%m-%d %T') as start, DATE_FORMAT(stop, '%Y-%m-%d %T') as stop, contributor, icon from external_events WHERE stop >= NOW() ORDER BY start DESC"
        )
        .then(rows => {
          conn.end();
          return rows;
        })
        .catch(err => {
          conn.end();
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function getEventId() {
  return connection.pool
    .getConnection()
    .then(conn => {
      return conn
        .query(
          "SELECT eid from external_events WHERE stop >= NOW() ORDER BY start DESC"
        )
        .then(rows => {
          conn.end();
          return rows;
        })
        .catch(err => {
          conn.end();
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

async function insertEvents(events) {
  const conn = await connection.pool.getConnection();
  conn
    .batch(
      "INSERT INTO external_events(eid, title, title_en, description, description_en, latitude, longitude, type, start, stop, contributor, icon) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      formatDataToInsert(events)
    )
    .then(response => {
      conn.end();
      return response;
    })
    .catch(err => {
      throw new Error("Higher-level error. " + err.message);
    })
    .catch(err => {
      conn.end();
      console.log(err);
    });
}

function formatDataToInsert(events) {
  let result = [];
  events.map(event => {
    let row = [];
    for (key in event) {
      switch (key) {
        case "eid":
          event[key] = parseInt(event[key]);
          break;
        case "latitude":
          event[key] = parseFloat(event[key]);
          break;
        case "longitude":
          event[key] = parseFloat(event[key]);
          break;
        case "start":
          event[key] = new Date(event[key]);
          break;
        case "stop":
          event[key] = new Date(event[key]);
          break;
      }
      row.push(event[key]);
    }
    result.push(row);
  });
  return result;
}

module.exports = {
  getEvents,
  getEventId,
  insertEvents
};
