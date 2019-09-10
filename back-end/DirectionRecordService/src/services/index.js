const DirectionRecord = require("../models/direction-record");

exports.createRecord = body => {
  const directionRecord = new DirectionRecord(body);
  return directionRecord.save();
};

exports.getRecord = query => {
  const { fields, ...where } = query;
  return DirectionRecord.find(where, fields).lean();
};

exports.getRecordById = id => DirectionRecord.findById(id).lean();

exports.patchRecordById = (id, directionRecord) =>
  DirectionRecord.findByIdAndUpdate(id, directionRecord, { new: true });

exports.deleteRecordById = id => DirectionRecord.findByIdAndDelete(id);
