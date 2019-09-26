const consumer = require("../consumers/notification");
const asyncWrapper = require("../middleware/async-wrapper");

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
