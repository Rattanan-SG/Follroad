exports.formatRecordToSendMessageQueue = records =>
  records.map(({ _id, uid, name, notificationRoutes, delaySeconds }) => ({
    messageBody: name,
    messageAttributes: {
      id: _id,
      uid,
      name,
      notificationRoutes
    },
    delaySeconds
  }));
