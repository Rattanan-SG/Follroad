const AWS = require("../config/aws");
const { logInfo } = require("../utils/logger");
const { chunk, mapValues } = require("lodash/fp");

const sqs = new AWS.SQS();

const getQueueUrlByName = async queueName => {
  const params = { QueueName: queueName };
  const { QueueUrl } = await sqs.getQueueUrl(params).promise();
  return QueueUrl;
};

const parseDataToEntrie = (data, index) => {
  const MessageAttributes = mapValues(object => {
    return {
      DataType: "String",
      StringValue: object.toString()
    };
  })(data);
  return {
    Id: index.toString(),
    MessageBody: data.title,
    MessageAttributes
  };
};

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
    const chunkData = chunk(size)(body);
    const result = await Promise.all(
      chunkData.map((array, i) => {
        const Entries = array.map((data, index) =>
          parseDataToEntrie(data, index + size * i)
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
    const Entries = parseDataToEntrie(body, 0);
    const payload = {
      QueueUrl,
      Entries
    };
    const result = await sqs.sendMessageBatch(payload).promise();
    logInfo("Sent data to queue complete", result);
    return result;
  }
};
