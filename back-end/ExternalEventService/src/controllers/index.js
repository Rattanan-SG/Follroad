const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

exports.getEvent = asyncWrapper(async (req, res) => {
  const result = await service.getEvent(req.query);
  res.send(result);
});

exports.updateEvent = asyncWrapper(async (req, res) => {
  const result = await service.updateEventToDatabase();
  res.send(result);
});
