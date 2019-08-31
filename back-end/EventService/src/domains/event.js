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
  const { scope, ...option } = options;
  if (scope)
    return event.scope(scope).findAll({
      where,
      ...option
    });
  else
    return event.findAll({
      where,
      ...option
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
