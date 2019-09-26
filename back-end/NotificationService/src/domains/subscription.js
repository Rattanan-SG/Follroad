const Subscription = require("../models/subscription");

exports.create = body => {
  const subscription = new Subscription(body);
  return subscription.save();
};

exports.findAll = (where, fields, options) =>
  Subscription.find(where, fields, options).lean();

exports.findByPk = (id, fields, options) =>
  Subscription.findById(id, fields, options).lean();

exports.updateByPk = (id, body, options) =>
  Subscription.findByIdAndUpdate(id, body, options);

exports.deleteByPk = (id, options) =>
  Subscription.findByIdAndDelete(id, options);

exports.updateOne = (filter, body, options) =>
  Subscription.updateOne(filter, body, options);

exports.deleteOne = (filter, options) =>
  Subscription.deleteOne(filter, options);
