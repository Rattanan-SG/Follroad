const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");
const s3 = require("../services/s3");

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

exports.getSignedUrl = asyncWrapper(async (req, res) => {
  const result = await s3.getSignedUrl(req.query);
  res.send(result);
});

exports.createPresignedPost = asyncWrapper(async (req, res) => {
  const result = await s3.createPresignedPost(req.query);
  res.send(result);
});

exports.attachment = asyncWrapper(async (req, res) => {
  const result = await s3.attachment();
  res.send(result);
});
