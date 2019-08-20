const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

exports.checkRoute = asyncWrapper(async (req, res) => {
  const result = await service.checkRoute(req.body);
  res.send(result);
});
