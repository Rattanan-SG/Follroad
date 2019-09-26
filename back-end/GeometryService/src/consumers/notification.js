const { Consumer } = require("sqs-consumer");
const { consumer } = require("../services");
const { logInfo, logError } = require("../utils/logger");

const eventConsumer = Consumer.create({
  queueUrl: global.gConfig.sqs_notification_url,
  messageAttributeNames: ["All"],
  handleMessageBatch: async messages =>
    consumer.handleMessageBatchCheckEvents(messages),
  batchSize: 10,
  visibilityTimeout: 10
});

eventConsumer.on("error", err => {
  logError("SQS-Consumer error", err);
});

eventConsumer.on("processing_error", err => {
  logError("SQS-Consumer processing_error", err);
});

eventConsumer.on("timeout_error", err => {
  logError("SQS-Consumer timeout_error", err);
});

eventConsumer.on("stopped", () => {
  logInfo("SQS-Consumer stopped");
});

eventConsumer.start();

exports.start = () => {
  eventConsumer.start();
  logInfo("SQS-Consumer start");
  return "SQS-Consumer start";
};

exports.stop = () => {
  eventConsumer.stop();
  return "SQS-Consumer stop";
};

exports.isRunning = () => {
  if (eventConsumer.isRunning) {
    return { status: "start" };
  }
  return { status: "stop" };
};
