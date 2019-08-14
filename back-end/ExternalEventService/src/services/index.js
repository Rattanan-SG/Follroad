const domain = require("../domains");
const itic = require("./itic-api");
const { logInfo } = require("../utils/logger");

exports.getEvent = query => {
  let limit = parseInt(query.limit);
  let startAt = query.startAt;
  if (limit && startAt) {
    return domain.getEventHaveLimit(startAt, limit);
  } else {
    return domain.getEvent();
  }
};

exports.syncEvent = async () => {
  const response = await Promise.all([
    domain.getEventId(),
    itic.getExternalEvent()
  ]);
  const databaseEventsEid = response[0].map(x => x.eid);
  const eventFilter = response[1].filter(
    event => !databaseEventsEid.includes(parseInt(event.eid))
  );
  if (eventFilter.length != 0) {
    const result = await domain.batchInsertEvent(eventFilter);
    logInfo("Update event complete", result);
    return result;
  } else {
    logInfo("Not have event to update");
    return { message: "Not have event to update" };
  }
};

exports.getEventByType = type => {
  return domain.getEventByType(type);
};
