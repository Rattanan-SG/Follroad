const { logError } = require("../utils/logger");

module.exports = async (err, req, res, next) => {
  const { status, statusCode } = err;
  logError("error-middleware", {
    req: req.originalUrl,
    error: err
  });
  return res.status(status || statusCode || 500).json(err);
};
