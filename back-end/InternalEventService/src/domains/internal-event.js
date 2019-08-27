const sequelize = require("sequelize");
const { internalEvent } = require("../models");

exports.create = (payload, options) =>
  internalEvent.create(payload, {
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
