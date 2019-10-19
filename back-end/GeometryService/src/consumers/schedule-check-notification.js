const { Consumer } = require("sqs-consumer");
const { consumer } = require("../services");
const { logInfo, logError } = require("../utils/logger");

const directionRecordConsumer = Consumer.create({
  queueUrl: global.gConfig.sqs_schedule_check_notification_url,
  messageAttributeNames: ["All"],
  handleMessageBatch: async messages =>
    consumer.handleBatchCheckDirectionRecord(messages),
  batchSize: 10,
  visibilityTimeout: 30
});

directionRecordConsumer.on("error", err => {
  logError("SQS-Consumer error", err);
});

directionRecordConsumer.on("processing_error", err => {
  logError("SQS-Consumer processing_error", err);
});

directionRecordConsumer.on("timeout_error", err => {
  logError("SQS-Consumer timeout_error", err);
});

directionRecordConsumer.on("stopped", () => {
  logInfo("SQS-Consumer stopped");
});

directionRecordConsumer.start();

exports.start = () => {
  directionRecordConsumer.start();
  logInfo("SQS-Consumer start");
  return "SQS-Consumer start";
};

exports.stop = () => {
  directionRecordConsumer.stop();
  return "SQS-Consumer stop";
};

exports.isRunning = () => {
  return directionRecordConsumer.isRunning
    ? { status: "start" }
    : { status: "stop" };
};
