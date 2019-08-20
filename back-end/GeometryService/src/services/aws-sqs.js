const AWS = require("../config/aws");

const sqs = new AWS.SQS();

exports.receiveMessage = body => {
  var params = {
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    QueueUrl:
      "https://sqs.ap-southeast-1.amazonaws.com/583507551570/Notification",
    VisibilityTimeout: 20,
    WaitTimeSeconds: 20
  };
  return sqs
    .receiveMessage(params)
    .promise()
    .then(res => res.Messages);
};

exports.deleteMessageBatch = messages => {
  const Entries = messages.map((item, index) => {
    return {
      Id: index.toString(),
      ReceiptHandle: item.ReceiptHandle
    };
  });
  const params = {
    QueueUrl:
      "https://sqs.ap-southeast-1.amazonaws.com/583507551570/Notification",
    Entries
  };
  return sqs.deleteMessageBatch(params).promise();
};
