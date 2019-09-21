const { logError } = require("../utils/logger");

module.exports = async (error, req, res, next) => {
  console.log(error);
  logError("Unplanned Error happen", {
    req: req.originalUrl,
    error: error.toString()
  });
  return res.status(500).send({
    error: "GENERIC",
    description: "Something went wrong. Please try again or contact support.",
    message: error.toString()
  });
};
