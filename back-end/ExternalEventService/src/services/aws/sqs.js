const AWS = require("../../config/aws");
const { logInfo } = require("../../utils/logger");

const sqs = new AWS.SQS();

const option = { QueueName: global.gConfig.sqs_queue_name };

const parseEventToEntrie = event => {
  return {
    Id: event.eid.toString(),
    MessageBody: `${event.eid} : ${event.title}`,
    MessageAttributes: {
      title: {
        DataType: "String",
        StringValue: event.title
      },
      description: {
        DataType: "String",
        StringValue: event.description
      },
      type: {
        DataType: "String",
        StringValue: event.type.toString()
      },
      latitude: {
        DataType: "String",
        StringValue: event.latitude.toString()
      },
      longitude: {
        DataType: "String",
        StringValue: event.longitude.toString()
      }
    }
  };
};

exports.sendMessageBatch = async events => {
  const { QueueUrl } = await sqs.getQueueUrl(option).promise();
  const Entries = events.map(event => parseEventToEntrie(event));
  const payload = {
    QueueUrl,
    Entries
  };
  const result = await sqs.sendMessageBatch(payload).promise();
  logInfo("Sent event to queue complete", result);
  return result;
};
