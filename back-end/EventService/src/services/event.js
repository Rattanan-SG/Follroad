const { Op } = require("sequelize");
const { DateTime } = require("luxon");
const itic = require("../clients/itic");
const messageQueue = require("../clients/message-queue");
const { event } = require("../domains");
const { EVENT_SOURCE, EVENT_MAPPING } = require("../utils/constant");
const { formatEventToSendMessageQueue } = require("../utils/format-event");
const { logInfo, logDebug } = require("../utils/logger");

exports.createEvent = async body => {
  let stop = body.stop;
  if (!stop) {
    stop = calculateDefaultStopFromType(body);
  }
  const result = await event.create({ ...body, stop });
  logInfo("Create event complete", result.dataValues);
  sendEventToMessageQueue([result]);
  return result;
};

exports.getEvent = query => {
  const { limit, startFrom, ...where } = query;
  if (limit) {
    let time;
    startFrom ? (time = new Date(startFrom)) : (time = new Date());
    return event.findAll(
      { ...where, start: { [Op.lt]: time } },
      {
        scope: ["activeEvent"],
        limit: Number(limit)
      }
    );
  } else {
    return event.findAll(where, { scope: ["activeEvent"] });
  }
};

exports.getEventById = id => event.findByPk(id);

exports.patchEventById = (id, body) => event.updateByPk(id, body);

exports.deleteEventById = id => event.deleteByPk(id);

exports.syncIticEvent = async () => {
  const response = await Promise.all([
    event.findAll({ source: EVENT_SOURCE.ITIC }, { attributes: ["eid"] }),
    itic.getExternalEvent()
  ]);
  const databaseEventEid = response[0].map(({ eid }) => eid);
  const eventFilter = response[1].filter(
    event => !databaseEventEid.includes(event.eid)
  );
  const dataList = eventFilter.map(event => ({ ...event, source: "itic" }));
  if (eventFilter.length > 0) {
    logDebug("New Event to insert", {
      length: eventFilter.length,
      eid: eventFilter.map(event => event.eid)
    });
    const result = await event.bulkCreate(dataList, {
      updateOnDuplicate: [
        "title",
        "description",
        "latitude",
        "longitude",
        "type",
        "start",
        "stop",
        "contributor",
        "icon"
      ]
    });
    logInfo("Update event complete", { affectedRows: result.length });
    sendEventToMessageQueue(dataList);
    return result;
  } else {
    logInfo("Not have event to update");
    return { message: "Not have event to update" };
  }
};

const calculateDefaultStopFromType = ({ start, type }) => {
  let stop = DateTime.fromISO(start);
  const { defaultDuration } = EVENT_MAPPING.find(
    element => element.type === type
  );
  stop = stop.plus(defaultDuration);
  return stop;
};

const sendEventToMessageQueue = events => {
  const data = formatEventToSendMessageQueue(events);
  messageQueue.sendMessage(global.gConfig.notification_queue_name, data);
};
