const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");
const consumer = require("../consumers/aws-sqs");

exports.checkRoute = asyncWrapper(async (req, res) => {
  const result = await service.checkss(req.body);
  res.send(result);
});

exports.consumerCheck = asyncWrapper(async (req, res) => {
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
