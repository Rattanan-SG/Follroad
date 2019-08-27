const asyncWrapper = require("../middleware/async-wrapper");
const { internalEvent } = require("../services");

exports.createInternalEvent = asyncWrapper(async (req, res) => {
  const result = await internalEvent.createInternalEvent(req.body);
  res.send(result);
});

exports.getInternalEvent = asyncWrapper(async (req, res) => {
  const result = await internalEvent.getInternalEvent(req.query);
  res.send(result);
});

exports.getInternalEventById = asyncWrapper(async (req, res) => {
  const result = await internalEvent.getInternalEventById(req.params.id);
  res.send(result);
});

// exports.patchInternalEventById = asyncWrapper(async (req, res) => {
//   const result = await internalEvent.patchRecordById(req.params.id, req.body);
//   res.send(result);
// });

// exports.deleteInternalEventById = asyncWrapper(async (req, res) => {
//   const result = await internalEvent.deleteRecordById(req.params.id);
//   res.send(result);
// });
