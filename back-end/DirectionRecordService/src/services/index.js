const { DateTime, Duration } = require("luxon");
const directionRecord = require("../domains/direction-record");
const CustomError = require("../utils/custom-error");
const messageQueueApi = require("../clients/message-queue");
const { formatRecordToSendMessageQueue } = require("../utils/format-record");

exports.createRecord = (user, body) => {
  const { sub: uid } = user;
  return directionRecord.create({ ...body, uid });
};

exports.getRecord = query => {
  const { fields, ...where } = query;
  return directionRecord.findAll(where, fields);
};

exports.getRecordThatReceiveNotification = query => {
  const { fields, ...where } = query;
  return directionRecord.findAll(
    { "notificationRoutes.0": { $exists: true }, ...where },
    fields
  );
};

exports.getRecordById = (id, query) => {
  const { fields } = query;
  return directionRecord.findByPk(id, fields);
};

exports.patchRecordById = async (id, user, body) => {
  await checkDirectionRecordKeyAndOwner(id, user);
  delete body.uid;
  return directionRecord.updateByPk(id, body, { new: true });
};

exports.deleteRecordById = async (id, user) => {
  await checkDirectionRecordKeyAndOwner(id, user);
  return directionRecord.deleteByPk(id);
};

exports.sendRecordToCheckNotification = async () => {
  const records = await directionRecord.findAll(
    {
      "notificationRoutes.0": { $exists: true },
      notificationTime: { $elemMatch: { ongoing: true } }
    },
    "id uid name notificationRoutes notificationTime"
  );
  let delaySecondsList = [];
  const notificationRecords = records
    .filter(record => {
      const { _id, notificationTime } = record;
      const now = DateTime.local().toUTC();
      return notificationTime.some(element => {
        const { time, type, days, ongoing } = element;
        const dt = DateTime.fromJSDate(time).toUTC();
        let delay = 0;
        let result = false;
        if (type === "onetime" && ongoing) {
          result =
            now.set({ second: 0, millisecond: 0 }) <= dt &&
            dt <= now.set({ second: 0, millisecond: 0 }).plus({ minutes: 5 });
          delay = Duration.fromObject({
            minutes: dt.minute - now.minute,
            seconds: dt.second - now.second
          }).as("seconds");
          if (result) {
            directionRecord
              .updateNotificationTimeOngoingById(_id, element._id, false)
              .then();
          }
        } else if (type === "schedule" && ongoing) {
          if (days.includes(now.weekdayLong)) {
            result =
              now.set({ second: 0, millisecond: 0 }).toISOTime() <=
                dt.toISOTime() &&
              dt.toISOTime() <=
                now
                  .set({ second: 0, millisecond: 0 })
                  .plus({ minutes: 5 })
                  .toISOTime();
            delay = Duration.fromObject({
              minutes: dt.minute - now.minute,
              seconds: dt.second - now.second
            }).as("seconds");
          }
        }
        if (result) delaySecondsList.push(delay < 0 ? 0 : delay);
        return result;
      });
    })
    .map((key, i) => ({ ...key, delaySeconds: delaySecondsList[i] }));
  if (notificationRecords.length > 0)
    sendRecordToMessageQueue(notificationRecords);
  return notificationRecords;
};

const checkDirectionRecordKeyAndOwner = async (id, user) => {
  const { sub: uid } = user;
  const result = await directionRecord.findByPk(id, "uid");
  if (!result)
    throw new CustomError(
      "DIRECTION_RECORD_NOT_FOUND",
      400,
      `Not found direction record with this id: ${id}`
    );
  if (result.uid != uid)
    throw new CustomError(
      "FORBIDDEN",
      403,
      `You do not have rights for this resource`
    );
};

const sendRecordToMessageQueue = records => {
  const data = formatRecordToSendMessageQueue(records);
  messageQueueApi.sendMessage(global.gConfig.message_queue_name, data);
};
