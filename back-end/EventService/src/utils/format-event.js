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
    })
  );
