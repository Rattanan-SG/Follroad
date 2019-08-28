const { event } = require("../models");

exports.create = (data, options) =>
  event.create(data, {
    ...options
  });

exports.bulkCreate = (dataList, options) =>
  event.bulkCreate(dataList, {
    ...options
  });

exports.findAll = (where, options) => {
  if (options.scope)
    return event.scope(...options.scope).findAll({
      where,
      ...options
    });
  else
    return event.findAll({
      where,
      ...options
    });
};

exports.findByPk = (id, options) =>
  event.findByPk(id, {
    ...options
  });

exports.updateByPk = (id, data, options) =>
  event.update(data, {
    where: { id },
    ...options
  });

exports.deleteByPk = (id, options) =>
  event
    .destroy({
      where: { id },
      ...options
    })
    .then(response => ({
      response
    }));
