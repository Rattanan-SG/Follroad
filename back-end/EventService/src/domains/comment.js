const { comment } = require("../models");

exports.create = (data, options) =>
  comment.create(data, {
    ...options
  });

exports.findAll = (where, options) =>
  comment.findAll({
    where,
    ...options
  });

exports.findByPk = (id, options) =>
  comment.findByPk(id, {
    ...options
  });

exports.updateByPk = (id, data, options) =>
  comment.update(data, {
    where: { id },
    ...options
  });

exports.deleteByPk = (id, options) =>
  comment
    .destroy({
      where: { id },
      ...options
    })
    .then(response => ({
      response
    }));
