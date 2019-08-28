const { pool } = require("../config/database");
const { formatEventToInsert } = require("../utils/format-event");
const sql = require("../utils/sql.json");

exports.getEvent = () => pool.query(sql.getEvent);

exports.getEventHaveLimit = async (startAt, limit) => {
  let result;
  if (startAt === "now") {
    result = await pool.query(sql.getEventHaveLimitFirstTime, [limit]);
  } else {
    result = await pool.query(sql.getEventHaveLimit, [startAt, limit]);
  }
  return result;
};

exports.getEventId = () => pool.query(sql.getEventId);

exports.getEventByType = type => pool.query(sql.getEventByType, type);

exports.batchInsertEvent = async events => {
  try {
    const connection = await pool.getConnection();
    connection.beginTransaction();
    const result = await connection.batch(
      sql.insertEvent,
      formatEventToInsert(events)
    );
    await connection.commit();
    await connection.end();
    return result;
  } catch (error) {
    console.log(error);
    await connection.rollback();
    await connection.end();
  }
};
