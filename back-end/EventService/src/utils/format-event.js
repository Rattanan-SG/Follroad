exports.formatEventToSendMessageQueue = events =>
  events.map(
    ({
      id,
      title,
      description,
      latitude,
      longitude,
      start,
      stop,
      contributor,
      icon,
      source
    }) => ({
      messageBody: title,
      messageAttributes: {
        id,
        title,
        description,
        latitude,
        longitude,
        start,
        stop,
        contributor,
        icon,
        source
      }
    })
  );
