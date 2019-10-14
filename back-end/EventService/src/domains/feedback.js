const { feedback } = require("../models");

exports.create = (data, options) =>
  feedback.create(data, {
    ...options
  });

exports.findAll = (where, options) =>
  feedback.findAll({
    where,
    ...options
  });

exports.findByPk = (id, options) =>
  feedback.findByPk(id, {
    ...options
  });

exports.updateByPk = (id, data, options) =>
  feedback.update(data, {
    where: { id },
    ...options
  });

exports.deleteByPk = (id, options) =>
  feedback
    .destroy({
      where: { id },
      ...options
    })
    .then(response => ({
      response
    }));

exports.upsert = (data, options) =>
  feedback.upsert(data, {
    ...options
  });
