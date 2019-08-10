const asyncWrapper = require("../middleware/async-wrapper");
const service = require("../services");

exports.home = (req, res) => {
  res.status(200).send({ status: "UP" });
};

exports.register = asyncWrapper(async (req, res) => {
  const result = await service.register(req.body);
  res.send(result);
});

exports.send = asyncWrapper(async (req, res) => {
  const { endpoint, keys } = req.body;
  const result = await service.sendNotification(endpoint, keys);
  res.send(result);
});
