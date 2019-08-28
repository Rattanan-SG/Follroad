const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");
const consumer = require("../consumers/notification");

exports.isLocationOnRoute = asyncWrapper(async (req, res) => {
  const result = await service.isLocationOnRoute(req.body);
  res.send(result);
});

exports.consumerStatus = asyncWrapper(async (req, res) => {
  const result = await consumer.isRunning();
  res.send(result);
});

exports.consumerStart = asyncWrapper(async (req, res) => {
  const result = await consumer.start();
  res.send(result);
});
exports.consumerStop = asyncWrapper(async (req, res) => {
  const result = await consumer.stop();
  res.send(result);
});
