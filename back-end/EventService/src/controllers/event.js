const asyncWrapper = require("../middleware/async-wrapper");
const { event } = require("../services");

exports.createEvent = asyncWrapper(async (req, res) => {
  const result = await event.createEvent(req.user, req.body);
  res.send(result);
});

exports.getEvent = asyncWrapper(async (req, res) => {
  const fields = req.query.fields && req.query.fields.split(" ");
  const result = await event.getEvent({ ...req.query, fields });
  res.send(result);
});

exports.getEventById = asyncWrapper(async (req, res) => {
  const fields = req.query.fields && req.query.fields.split(" ");
  const result = await event.getEventById(req.params.id, {
    ...req.query,
    fields
  });
  res.send(result);
});

exports.getUserEventByUid = asyncWrapper(async (req, res) => {
  const fields = req.query.fields && req.query.fields.split(" ");
  const result = await event.getUserEventByUid(req.params.uid, {
    ...req.query,
    fields
  });
  res.send(result);
});

exports.patchEventById = asyncWrapper(async (req, res) => {
  const result = await event.patchEventById(req.params.id, req.user, req.body);
  res.send(result);
});

exports.deleteEventById = asyncWrapper(async (req, res) => {
  const result = await event.deleteEventById(req.params.id, req.user);
  res.send(result);
});

exports.syncIticEvent = asyncWrapper(async (req, res) => {
  const result = await event.syncIticEvent();
  res.send(result);
});
