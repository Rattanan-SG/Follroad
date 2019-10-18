const newEventConsumer = require("../consumers/new-event-notification");
const asyncWrapper = require("../middleware/async-wrapper");

exports.newEventConsumerStatus = asyncWrapper(async (req, res) => {
  const result = await newEventConsumer.isRunning();
  res.send(result);
});

exports.newEventConsumerStart = asyncWrapper(async (req, res) => {
  const result = await newEventConsumer.start();
  res.send(result);
});
exports.newEventConsumerStop = asyncWrapper(async (req, res) => {
  const result = await newEventConsumer.stop();
  res.send(result);
});
