const sequelize = require("sequelize");
const { Op } = sequelize;
const { DateTime } = require("luxon");
const { event } = require("../domains");
const { picture, comment, feedback, sequelize: seq } = require("../models");
const { EVENT_SOURCE, EVENT_MAPPING } = require("../utils/constant");
const { formatEventToSendMessageQueue } = require("../utils/format-event");
const { logInfo, logDebug } = require("../utils/logger");
const CustomError = require("../utils/custom-error");
const iticApi = require("../clients/itic");
const messageQueueApi = require("../clients/message-queue");
const io = require("../socket/io");

exports.createEvent = async (user, body) => {
  const { sub: uid } = user;
  let stop = body.stop;
  if (!stop) {
    stop = calculateDefaultStopFromType(body);
  }
  const transaction = await seq.transaction({
    autoCommit: false,
    isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
  });
  try {
    const result = await event.create(
      { ...body, uid, stop },
      { include: [picture], transaction }
    );
    logInfo("Create event complete", result.dataValues);
    if (new Date(result.stop) > new Date()) {
      sendEventToMessageQueue([result]);
      io.getIO().emit("event", { action: "create", event: result });
    }
    await transaction.commit();
    return result;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

exports.getEvent = async query => {
  const {
    fields,
    limit,
    startFrom,
    lastId,
    countFeedback,
    countComment,
    withPictures,
    ...where
  } = query;
  let include = [];
  if (countFeedback) include.push(getIncludeCountFeedbackObject());
  if (countComment) include.push(getIncludeCountCommentObject());
  if (withPictures) include.push(picture);
  if (include.length < 0) include = null;
  if (limit) {
    let start, id;
    startFrom
      ? (start = DateTime.fromISO(startFrom).toUTC())
      : (start = DateTime.local().toUTC());
    lastId ? (id = lastId) : (id = 0);
    return event.findAll(
      {
        ...where,
        [Op.or]: [{ start: { [Op.lt]: +start } }, { id: { [Op.gt]: id } }]
      },
      {
        scope: ["activeEvent"],
        limit: Number(limit),
        attributes: fields,
        include
      }
    );
  } else {
    return event.findAll(where, {
      scope: ["activeEvent"],
      attributes: fields,
      include
    });
  }
};

exports.getEventById = (id, query) => {
  const { fields } = query;
  return event.findByPk(id, {
    attributes: fields,
    include: [picture, comment, getIncludeCountFeedbackObject()],
    order: [[{ model: comment }, "updatedAt", "DESC"]]
  });
};

exports.getUserEventByUid = (uid, query) => {
  const { fields, withPictures } = query;
  let include = [];
  if (withPictures) include.push(picture);
  if (include.length < 0) include = null;
  return event.findAll(
    { uid },
    {
      attributes: fields,
      include
    }
  );
};

exports.patchEventById = async (id, user, body) => {
  await checkEventKeyAndOwner(id, user);
  delete body.eid;
  delete body.uid;
  return event.updateByPk(id, body);
};

exports.deleteEventById = async (id, user) => {
  await checkEventKeyAndOwner(id, user);
  return event.deleteByPk(id);
};

exports.syncIticEvent = async () => {
  const response = await Promise.all([
    event.findAll(
      { source: EVENT_SOURCE.ITIC },
      { scope: ["activeEvent"], attributes: ["eid"] }
    ),
    iticApi.getExternalEvent()
  ]);
  const databaseEventEid = response[0].map(({ eid }) => eid);
  const eventFilter = response[1].filter(
    item => !databaseEventEid.includes(item.eid)
  );
  const dataList = eventFilter.map(event => ({
    ...event,
    start: DateTime.fromSQL(event.start, {
      zone: "Asia/Bangkok"
    }).toUTC(),
    stop: DateTime.fromSQL(event.stop, {
      zone: "Asia/Bangkok"
    }).toUTC(),
    source: "itic"
  }));
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
    sendEventToMessageQueue(result);
    io.getIO().emit("event", { action: "sync", event: result.length });
    return result;
  } else {
    logInfo("Not have event to update");
    return { message: "Not have event to update" };
  }
};

const checkEventKeyAndOwner = async (id, user) => {
  const { sub: uid } = user;
  const result = await event.findByPk(id);
  if (!result)
    throw new CustomError(
      "EVENT_NOT_FOUND",
      400,
      `Not found event with this id: ${id}`
    );
  if (result.uid != uid)
    throw new CustomError(
      "FORBIDDEN",
      403,
      `You do not have rights for this resource`
    );
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
  messageQueueApi.sendMessage(global.gConfig.message_queue_name, data);
};

const getIncludeCountFeedbackObject = () => ({
  model: feedback,
  attributes: [
    [
      sequelize.fn(
        "SUM",
        sequelize.literal("CASE WHEN react = true THEN 1 ELSE 0 END")
      ),
      "like"
    ],
    [
      sequelize.fn(
        "SUM",
        sequelize.literal("CASE WHEN react = false THEN 1 ELSE 0 END")
      ),
      "dislike"
    ]
  ],
  group: ["eventId"],
  required: false,
  separate: true
});

const getIncludeCountCommentObject = () => ({
  model: comment,
  attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "count"]],
  group: ["eventId"],
  required: false,
  separate: true
});
