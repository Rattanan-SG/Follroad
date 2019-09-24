const DirectionRecord = require("../models/direction-record");
const CustomError = require("../utils/custom-error");

exports.createRecord = body => {
  const directionRecord = new DirectionRecord(body);
  return directionRecord.save();
};

exports.getRecord = query => {
  const { fields, ...where } = query;
  return DirectionRecord.find(where, fields).lean();
};

exports.getRecordThatReceiveNotification = query => {
  const { fields, ...where } = query;
  return DirectionRecord.find(
    { "notificationRoutes.0": { $exists: true }, ...where },
    fields
  ).lean();
};

exports.getRecordById = id => DirectionRecord.findById(id).lean();

exports.patchRecordById = async (id, user, body) => {
  await checkDirectionRecordKeyAndOwner(id, user);
  return DirectionRecord.findByIdAndUpdate(id, body, { new: true });
};

exports.deleteRecordById = async (id, user) => {
  await checkDirectionRecordKeyAndOwner(id, user);
  return DirectionRecord.findByIdAndDelete(id);
};

const checkDirectionRecordKeyAndOwner = async (id, user) => {
  const { sub: uid } = user;
  const result = await DirectionRecord.findById(id).lean();
  if (!result)
    throw new CustomError(
      "EVENT_NOT_FOUND",
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
