const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

exports.createQueue = asyncWrapper(async (req, res) => {
  const result = await service.createQueue(req.body);
  res.send(result);
});

exports.getQueue = asyncWrapper(async (req, res) => {
  const result = await service.getQueue();
  res.send(result);
});

exports.deleteQueueByName = asyncWrapper(async (req, res) => {
  const result = await service.deleteQueueByName(req.params.name);
  res.send(result);
});

exports.sendMessageToQueueByName = asyncWrapper(async (req, res) => {
  const result = await service.sendMessageToQueueByName(
    req.params.name,
    req.body
  );
  res.send(result);
});
