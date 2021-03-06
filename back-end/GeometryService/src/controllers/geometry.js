const { geometry } = require("../services");
const asyncWrapper = require("../middleware/async-wrapper");

exports.isLocationOnRoute = asyncWrapper(async (req, res) => {
  const result = await geometry.isLocationOnRoute(req.body);
  res.send(result);
});

exports.checkAllEventWithDirectionRecordById = asyncWrapper(async (req, res) => {
  const result = await geometry.checkAllEventWithDirectionRecordById(req.body);
  res.send(result);
});
