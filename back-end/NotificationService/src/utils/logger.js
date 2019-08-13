const winston = require("winston");

const options = {
  console: {
    level: "debug"
  }
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.metadata(),
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false
});

exports.logDebug = (message, meta) => logger.debug(message, meta);
exports.logInfo = (message, meta) => logger.info(message, meta);
exports.logWarning = (message, meta) => logger.warn(message, meta);
exports.logError = (message, meta) => logger.error(message, meta);
