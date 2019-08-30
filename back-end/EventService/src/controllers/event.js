const asyncWrapper = require("../middleware/async-wrapper");
const { event } = require("../services");

exports.createEvent = asyncWrapper(async (req, res) => {
  const result = await event.createEvent(req.body);
  res.send(result);
});

exports.getEvent = asyncWrapper(async (req, res) => {
  const result = await event.getEvent(req.query);
  res.send(result);
});

exports.getEventById = asyncWrapper(async (req, res) => {
  const result = await event.getEventById(req.params.id);
  res.send(result);
});

exports.patchEventById = asyncWrapper(async (req, res) => {
  const result = await event.patchEventById(req.params.id, req.body);
  res.send(result);
});

exports.deleteEventById = asyncWrapper(async (req, res) => {
  const result = await event.deleteEventById(req.params.id);
  res.send(result);
});

exports.syncIticEvent = asyncWrapper(async (req, res) => {
  const result = await event.syncIticEvent();
  res.send(result);
});
