const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

exports.subscribe = asyncWrapper(async (req, res) => {
  const result = await service.subscribe(req.body);
  res.send(result);
});

exports.getSubscription = asyncWrapper(async (req, res) => {
  const result = await service.getSubscription(req.query);
  res.send(result);
});

exports.updateOrCreateSubscription = asyncWrapper(async (req, res) => {
  const result = await service.updateOrCreateSubscription(req.body);
  res.send(result);
});

exports.getSubscriptionThatUidisNull = asyncWrapper(async (req, res) => {
  const result = await service.getSubscriptionThatUidisNull();
  res.send(result);
});

exports.sendNotificationToSpecificUser = asyncWrapper(async (req, res) => {
  const result = await service.sendNotificationToSpecificUser(req.body);
  res.send(result);
});

exports.sendNotificationToAllUser = asyncWrapper(async (req, res) => {
  const result = await service.sendNotificationToAllUser(req.body);
  res.send(result);
});

exports.getSubscriptionById = asyncWrapper(async (req, res) => {
  const result = await service.getSubscriptionById(req.params.id, req.body);
  res.send(result);
});

exports.renewSubscription = asyncWrapper(async (req, res) => {
  const result = await service.renewSubscription(
    req.body.oldSubscription,
    req.body.newSubscription
  );
  res.send(result);
});

exports.updateSubscriptionById = asyncWrapper(async (req, res) => {
  const result = await service.updateSubscriptionById(req.params.id, req.body);
  res.send(result);
});

exports.unsubscribe = asyncWrapper(async (req, res) => {
  const result = await service.unsubscribe(req.body.endpoint);
  res.send(result);
});

exports.sendNotification = asyncWrapper(async (req, res) => {
  const result = await service.sendNotification(req.body);
  res.send(result);
});
