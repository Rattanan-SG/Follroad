const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

exports.getEvent = asyncWrapper(async (req, res) => {
  const result = await service.getEvent(req.query);
  res.send(result);
});

exports.syncEvent = asyncWrapper(async (req, res) => {
  const result = await service.syncEvent();
  res.send(result);
});

exports.getEventByType = asyncWrapper(async (req, res) => {
  const result = await service.getEventByType(req.params.type);
  res.send(result);
});
