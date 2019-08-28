const { internalEvent } = require("../models");

exports.create = (data, options) =>
  internalEvent.create(data, {
    ...options
  });

exports.findAll = (where, options) =>
  internalEvent.findAll({
    where,
    ...options
  });

exports.findByPk = (id, options) =>
  internalEvent.findByPk(id, {
    ...options
  });

exports.updateByPk = (id, data, options) =>
  internalEvent.update(data, {
    where: { id },
    ...options
  });

exports.deleteByPk = (id, options) =>
  internalEvent
    .destroy({
      where: { id },
      ...options
    })
    .then(response => ({
      response
    }));
