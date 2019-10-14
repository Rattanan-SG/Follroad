const directionRecord = require("../domains/direction-record");
const CustomError = require("../utils/custom-error");

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
