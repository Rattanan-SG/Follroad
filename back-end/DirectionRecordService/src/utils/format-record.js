exports.formatRecordToSendMessageQueue = records =>
  records.map(({ _id, uid, name, direction, notificationRoutes }) => ({
    messageBody: name,
    messageAttributes: {
      id: _id,
      uid,
      name,
      direction,
      notificationRoutes
    }
  }));
