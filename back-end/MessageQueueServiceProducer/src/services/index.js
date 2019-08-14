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
    Id: index,
    MessageBody: data.title,
    MessageAttributes
  };
};

// const o = {
//   a: "fdgfdg",
//   b: "DFgfdg"
// };

// parseDataToEntrie(o, 1);
// console.log(o);

// exports.createQueue = body => {
//   const params = {
//     QueueName: body.queueName
//   };
//   return sqs.createQueue(params).promise();
// };

exports.getQueue = async () => sqs.listQueues().promise();

exports.deleteQueueByName = async queueName => {
  const QueueUrl = await getQueueUrlByName(queueName);
  return sqs.deleteQueue({ QueueUrl }).promise();
};

exports.sendMessageToQueueByName = async (queueName, body) => {
  const QueueUrl = await getQueueUrlByName(queueName);
  const chunkData = chunk(10)(body);
  console.log(chunkData);

  const Entries = body.map((data, index) => parseDataToEntrie(data, index));
  const payload = {
    QueueUrl,
    Entries
  };
  const result = await sqs.sendMessageBatch(payload).promise();
  logInfo("Sent data to queue complete", result);
  return result;
};
