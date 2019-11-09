const { picture } = require("../models");

exports.create = (data, options) =>
  picture.create(data, {
    ...options
  });

exports.bulkCreate = (dataList, options) =>
  picture.bulkCreate(dataList, {
    ...options
  });

exports.findAll = (where, options) =>
  picture.findAll({
    where,
    ...options
  });

exports.findByPk = (id, options) =>
  picture.findByPk(id, {
    ...options
  });

exports.updateByPk = (id, data, options) =>
  picture.update(data, {
    where: { id },
    ...options
  });

exports.deleteByPk = (id, options) =>
  picture
    .destroy({
      where: { id },
      ...options
    })
    .then(response => ({
      response
    }));

exports.delete = (where, options) =>
  picture
    .destroy({
      where,
      ...options
    })
    .then(response => ({
      response
    }));
