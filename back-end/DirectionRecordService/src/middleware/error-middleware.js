const CustomError = require("../utils/custom-error");
const { logError } = require("../utils/logger");

module.exports = async (error, req, res, next) => {
  const { name, status, code, message } = error;
  if (error instanceof CustomError) {
    logError("Error happen", {
      request: `${req.method} ${req.originalUrl}`,
      error
    });
    return res.status(status).send({
      error: code,
      message
    });
  } else if (name === "UnauthorizedError") {
    logError("Unauthorized error", {
      request: `${req.method} ${req.originalUrl}`,
      error
    });
    return res.status(401).send(error);
  }
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
