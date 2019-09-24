const CustomError = require("../utils/custom-error");
const { logError } = require("../utils/logger");

module.exports = async (error, req, res, next) => {
  if (error.name === "UnauthorizedError") {
    logError("Unauthorized Error", {
      req: req.originalUrl,
      error
    });
    return res.status(401).send(error);
  } else if (error instanceof CustomError) {
    logError("Error happen", {
      req: req.originalUrl,
      error
    });
    return res.status(error.status).send({
      error: error.code,
      description: error.message
    });
  }
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
