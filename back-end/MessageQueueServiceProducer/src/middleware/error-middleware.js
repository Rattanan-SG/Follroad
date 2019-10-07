const { logError } = require("../utils/logger");

module.exports = async (error, req, res, next) => {
  console.log(error);
  logError("Unplanned error happen", {
    request: `${req.method} ${req.originalUrl}`,
    error: error.toString()
  });
  return res.status(500).send({
    error: "GENERIC",
    description: "Something went wrong. Please try again or contact support.",
    message: error.toString()
  });
};
