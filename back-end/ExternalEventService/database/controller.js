const connection = require("./connection");
const sql = require("./sql.json");

function getEvents() {
  return connection.pool
    .query(sql.getEvents)
    .then(rows => {
      return rows;
    })
    .catch(err => {
      catchError(err);
    });
}

async function getEventsHaveLimit(startAt, limit) {
  try {
    let result;
    if (startAt === "now") {
      result = await connection.pool.query(sql.getEventsHaveLimitFirstTime, [
        limit
      ]);
    } else {
      result = await connection.pool.query(sql.getEventsHaveLimit, [
        startAt,
        limit
      ]);
    }
    return result;
  } catch (err) {
    catchError(err);
  }
}

function getEventId() {
  return connection.pool
    .query(sql.getEventId)
    .then(rows => {
      return rows;
    })
    .catch(err => {
      catchError(err);
    });
}

function getEventByType(type) {
  return connection.pool
    .query(sql.getEventByType, type)
    .then(rows => {
      return rows;
    })
    .catch(err => {
      catchError(err);
    });
}

async function insertEvents(events) {
  const conn = await connection.pool.getConnection();
  conn.beginTransaction();
  return conn
    .batch(sql.insertEvents, formatDataToInsert(events))
    .then(response => {
      conn.commit();
      conn.end();
      return response;
    })
    .catch(err => {
      conn.rollback();
      conn.end();
      catchError(err);
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

function catchError(error) {
  throw new Error(
    "Higher-level error. : " +
      new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }) +
      " " +
      error.message
  );
}

module.exports = {
  getEvents,
  getEventsHaveLimit,
  getEventId,
  getEventByType,
  insertEvents
};
