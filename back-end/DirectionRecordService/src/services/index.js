const { DateTime } = require("luxon");
const directionRecord = require("../domains/direction-record");
const CustomError = require("../utils/custom-error");

exports.createRecord = (user, body) => {
  const { sub: uid } = user;
  return directionRecord.create({ ...body, uid });
};

exports.getRecord = query => {
  const { fields, ...where } = query;
  console.log(fields);

  return directionRecord.findAll(where, fields);
};

exports.getRecordThatReceiveNotification = query => {
  const { fields, ...where } = query;
  return directionRecord.findAll(
    { "notificationRoutes.0": { $exists: true }, ...where },
    fields
  );
};

exports.getRecordById = id => directionRecord.findByPk(id);

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
  const notificationRecords = records.filter(record => {
    const { notificationTime } = record;
    const now = DateTime.local().toUTC();
    return notificationTime.some(element => {
      const { time, type, days } = element;
      const dt = DateTime.fromJSDate(time).toUTC();
      if (type === "Onetime") {
        // console.log(now <= dt && dt <= now.plus({ minutes: 5 }));
        return now <= dt && dt <= now.plus({ minutes: 5 });
      } else if (type === "Schedule") {
        // console.log(now.weekdayLong);
        if (days.includes(now.weekdayLong)) {
          // console.log(now <= dt && dt <= now.plus({ minutes: 5 }));
          return now <= dt && dt <= now.plus({ minutes: 5 });
        }
      }
    });
  });
  console.log(notificationRecords);
  

  return records;
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
