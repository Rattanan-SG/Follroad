const { internalEvent } = require("../domains");

exports.createInternalEvent = body => internalEvent.create(body);

exports.getInternalEvent = query => internalEvent.findAll(query);

exports.getInternalEventById = id => internalEvent.findByPk(id);

exports.patchInternalEventById = (id, body) =>
  internalEvent.updateByPk(id, body);

exports.deleteInternalEventById = id => internalEvent.deleteByPk(id);
