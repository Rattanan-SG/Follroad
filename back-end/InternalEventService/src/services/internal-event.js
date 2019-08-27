const { internalEvent } = require("../domains");

exports.createInternalEvent = body => internalEvent.create(body);

exports.getInternalEvent = query => internalEvent.findAll(query);

exports.getInternalEventById = id => internalEvent.findByPk(id);

// exports.patchInternalEventById = (id, directionRecord) =>
//   DirectionRecord.findByIdAndUpdate(id, directionRecord, { new: true });

// exports.deleteInternalEventById = id => DirectionRecord.findByIdAndDelete(id);
