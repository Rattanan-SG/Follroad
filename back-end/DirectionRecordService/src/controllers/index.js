const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

exports.createRecord = asyncWrapper(async (req, res) => {
  const result = await service.createRecord(req.body);
  res.send(result);
});

exports.getRecord = asyncWrapper(async (req, res) => {
  const result = await service.getRecord(req.query);
  res.send(result);
});

exports.getRecordThatReceiveNotification = asyncWrapper(async (req, res) => {
  const result = await service.getRecordThatReceiveNotification(req.query);
  res.send(result);
});

exports.getRecordById = asyncWrapper(async (req, res) => {
  const result = await service.getRecordById(req.params.id);
  res.send(result);
});

exports.patchRecordById = asyncWrapper(async (req, res) => {
  const result = await service.patchRecordById(
    req.params.id,
    req.user,
    req.body
  );
  res.send(result);
});

exports.deleteRecordById = asyncWrapper(async (req, res) => {
  const result = await service.deleteRecordById(req.params.id, req.user);
  res.send(result);
});
