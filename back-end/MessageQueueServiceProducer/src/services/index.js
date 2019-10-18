const AWS = require("../config/aws");
const { chunk, mapValues } = require("lodash/fp");
const { logInfo } = require("../utils/logger");

const sqs = new AWS.SQS();

exports.createQueue = body => {
  const params = {
    QueueName: body.queueName
  };
  return sqs.createQueue(params).promise();
};

exports.getQueue = async () => sqs.listQueues().promise();

exports.deleteQueueByName = async queueName => {
  const QueueUrl = await getQueueUrlByName(queueName);
  return sqs.deleteQueue({ QueueUrl }).promise();
};

exports.sendMessageToQueueByName = async (queueName, body) => {
  const QueueUrl = await getQueueUrlByName(queueName);
  if (Array.isArray(body)) {
    const size = 10;
    const chunkBody = chunk(size)(body);
    const result = await Promise.all(
      chunkBody.map(array => {
        const Entries = array.map((object, index) =>
          parseBodyToEntriesItems(object, index)
        );
        const payload = {
          QueueUrl,
          Entries
        };
        return sqs.sendMessageBatch(payload).promise();
      })
    );
    logInfo("Sent data to queue complete", result);
    return result;
  } else {
    const Entries = parseBodyToEntriesItems(body, 0);
    const payload = {
      QueueUrl,
      Entries
    };
    const result = await sqs.sendMessageBatch(payload).promise();
    logInfo("Sent data to queue complete", result);
    return result;
  }
};

const getQueueUrlByName = async queueName => {
  const params = { QueueName: queueName };
  const { QueueUrl } = await sqs.getQueueUrl(params).promise();
  return QueueUrl;
};

const parseBodyToEntriesItems = (body, index) => {
  const { messageBody, messageAttributes, delaySeconds } = body;
  const MessageBody = messageBody || "Not have name";
  const DelaySeconds = Number(delaySeconds);
  const MessageAttributes = mapValues(object => {
    return {
      DataType: "String",
      StringValue: object.toString()
    };
  })(messageAttributes);
  return {
    Id: index.toString(),
    MessageBody,
    DelaySeconds,
    MessageAttributes
  };
};
