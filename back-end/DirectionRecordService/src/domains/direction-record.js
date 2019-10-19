const DirectionRecord = require("../models/direction-record");

exports.create = body => {
  const directionRecord = new DirectionRecord(body);
  return directionRecord.save();
};

exports.findAll = (where, fields, options) =>
  DirectionRecord.find(where, fields, options).lean();

exports.findByPk = (id, fields, options) =>
  DirectionRecord.findById(id, fields, options).lean();

exports.updateByPk = (id, body, options) =>
  DirectionRecord.findByIdAndUpdate(id, body, options);

exports.deleteByPk = (id, options) =>
  DirectionRecord.findByIdAndDelete(id, options);

exports.updateOne = (filter, body, options) =>
  DirectionRecord.updateOne(filter, body, options);

exports.deleteOne = (filter, options) =>
  DirectionRecord.deleteOne(filter, options);

exports.updateNotificationTimeOngoingById = (
  _id,
  notificationTime_id,
  value,
  options
) =>
  DirectionRecord.updateOne(
    {
      _id: _id,
      "notificationTime._id": notificationTime_id
    },
    {
      $set: {
        "notificationTime.$.ongoing": value
      }
    },
    options
  );
