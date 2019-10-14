const asyncWrapper = require("../middleware/async-wrapper");
const { comment } = require("../services");

exports.createComment = asyncWrapper(async (req, res) => {
  const result = await comment.createComment(req.user, req.body);
  res.send(result);
});

exports.getComment = asyncWrapper(async (req, res) => {
  const result = await comment.getComment(req.query);
  res.send(result);
});

exports.getCommentById = asyncWrapper(async (req, res) => {
  const result = await comment.getCommentById(req.params.id);
  res.send(result);
});

exports.patchCommentById = asyncWrapper(async (req, res) => {
  const result = await comment.patchCommentById(
    req.params.id,
    req.user,
    req.body
  );
  res.send(result);
});

exports.deleteCommentById = asyncWrapper(async (req, res) => {
  const result = await comment.deleteCommentById(req.params.id, req.user);
  res.send(result);
});
