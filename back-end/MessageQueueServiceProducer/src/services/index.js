// const AWS = require("../../config/aws");
// const { logInfo } = require("../utils/logger");
const { chunk, mapValues } = require("lodash/fp");

// const sqs = new AWS.SQS();

const getQueueUrlByName = async queueName => {
  const params = { QueueName: queueName };
  const { QueueUrl } = await sqs.getQueueUrl(params).promise();
  return QueueUrl;
};

const parseDataToEntrie = (data, index) => {
  // const MessageAttributes = parseObjectToMessageAttributes(data);
  const MessageAttributes = mapValues(object => {
    return {
      DataType: "String",
      StringValue: object.toString()
    };
  })(data);
  console.log(MessageAttributes);

  // return {
  //   Id: index,
  //   MessageBody: data.title,
  //   MessageAttributes
  // };
};

const o = {
  a: "fdgfdg",
  b: "DFgfdg"
};

parseDataToEntrie(o, 1);
console.log(o)

const parseObjectToMessageAttributes = object => {
  const MessageAttributes = Object.create(object);
  Object.keys(object).forEach(key => {
    MessageAttributes[key] = {
      DataType: "String",
      StringValue: object[key].toString()
    };
  });
  return MessageAttributes;
};

console.log(parseObjectToMessageAttributes(o));
console.log(o)
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

  const Entries = body.map((data, index) => parseDataToEntrie(data, index));
  const payload = {
    QueueUrl,
    Entries
  };
  const result = await sqs.sendMessageBatch(payload).promise();
  logInfo("Sent data to queue complete", result);
  return result;
};
