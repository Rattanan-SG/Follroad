const asyncWrapper = require("../middleware/async-wrapper");
const { picture } = require("../services");

exports.createPicture = asyncWrapper(async (req, res) => {
  const result = await picture.createPicture(req.body);
  res.send(result);
});

exports.getPicture = asyncWrapper(async (req, res) => {
  const result = await picture.getPicture(req.query);
  res.send(result);
});

exports.getPictureById = asyncWrapper(async (req, res) => {
  const result = await picture.getPictureById(req.params.id);
  res.send(result);
});

exports.patchPictureById = asyncWrapper(async (req, res) => {
  const result = await picture.patchPictureById(
    req.params.id,
    req.user,
    req.body
  );
  res.send(result);
});

exports.deletePictureById = asyncWrapper(async (req, res) => {
  const result = await picture.deletePictureById(req.params.id, req.user);
  res.send(result);
});
