const DirectionRecord = require("../models/direction-record");

exports.createRecord = body => {
  const directionRecord = new DirectionRecord(body);
  return directionRecord.save();
};

exports.getRecord = query => DirectionRecord.find(query);

exports.getRecordById = id => DirectionRecord.findById(id);

exports.patchRecordById = (id, directionRecord) =>
  DirectionRecord.findByIdAndUpdate(id, directionRecord, { new: true });

exports.deleteRecordById = id => DirectionRecord.findByIdAndDelete(id);
