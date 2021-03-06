const asyncWrapper = require("../middleware/async-wrapper");
const { feedback } = require("../services");

exports.createFeedback = asyncWrapper(async (req, res) => {
  const result = await feedback.createFeedback(req.user, req.body);
  res.send(result);
});

exports.putFeedback = asyncWrapper(async (req, res) => {
  const result = await feedback.createOrUpdateFeedback(req.user, req.body);
  res.send(result);
});

exports.getFeedback = asyncWrapper(async (req, res) => {
  const fields = req.query.fields && req.query.fields.split(" ");
  const result = await feedback.getFeedback({ ...req.query, fields });
  res.send(result);
});

exports.deleteFeedback = asyncWrapper(async (req, res) => {
  const result = await feedback.deleteFeedbackByUniqueKey(
    req.user,
    req.body.eventId
  );
  res.send(result);
});

exports.getFeedbackById = asyncWrapper(async (req, res) => {
  const fields = req.query.fields && req.query.fields.split(" ");
  const result = await feedback.getFeedbackById(req.params.id, {
    ...req.query,
    fields
  });
  res.send(result);
});

exports.patchFeedbackById = asyncWrapper(async (req, res) => {
  const result = await feedback.patchFeedbackById(
    req.params.id,
    req.user,
    req.body
  );
  res.send(result);
});

exports.deleteFeedbackById = asyncWrapper(async (req, res) => {
  const result = await feedback.deleteFeedbackById(req.params.id, req.user);
  res.send(result);
});

exports.getEventFeedbackSummary = asyncWrapper(async (req, res) => {
  const result = await feedback.getEventFeedbackSummary(req.query);
  res.send(result);
});

exports.getCountFeedbackOfEventById = asyncWrapper(async (req, res) => {
  const result = await feedback.countLikeAndDislikeOfEventById(
    req.params.eventId
  );
  res.send(result);
});
