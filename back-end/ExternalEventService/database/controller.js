const connection = require("./connection");

function getEvents() {
  return connection.pool
    .getConnection()
    .then(conn => {
      return conn
        .query(
          "SELECT eid, title, title_en, description, description_en, latitude, longitude, type, DATE_FORMAT(start, '%Y-%m-%d %T') as start, DATE_FORMAT(stop, '%Y-%m-%d %T') as stop, contributor, icon from external_events WHERE stop > NOW() ORDER BY start DESC"
        )
        .then(rows => {
          conn.end();
          return rows;
        })
        .catch(err => {
          conn.end();
          throw new Error(err.message);
        });
    })
    .catch(err => {
      throw new Error(
        "Higher-level error. : " +
          new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }) +
          " " +
          err.message
      );
    });
}

function getEventId() {
  return connection.pool
    .getConnection()
    .then(conn => {
      return conn
        .query(
          "SELECT eid from external_events WHERE stop > NOW() ORDER BY start DESC"
        )
        .then(rows => {
          conn.end();
          return rows;
        })
        .catch(err => {
          conn.end();
          throw new Error(err.message);
        });
    })
    .catch(err => {
      throw new Error(
        "Higher-level error. : " +
          new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }) +
          " " +
          err.message
      );
    });
}

async function insertEvents(events) {
  const conn = await connection.pool.getConnection();
  conn.beginTransaction();
  conn
    .batch(
      "INSERT INTO external_events(eid, title, title_en, description, description_en, latitude, longitude, type, start, stop, contributor, icon) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      formatDataToInsert(events)
    )
    .then(response => {
      conn.commit();
      conn.end();
      return response;
    })
    .catch(err => {
      conn.rollback();
      conn.end();
      throw new Error(
        "Higher-level error. : " +
          new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }) +
          " " +
          err.message
      );
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
