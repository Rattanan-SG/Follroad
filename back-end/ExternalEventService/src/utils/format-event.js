exports.formatDataToInsert = events => {
  let result = [];
  events.map(event => {
    let row = [];
    for (key in event) {
      switch (key) {
        case "eid":
          event[key] = parseInt(event[key]);
          break;
        case "latitude":
          event[key] = parseFloat(event[key]);
          break;
        case "longitude":
          event[key] = parseFloat(event[key]);
          break;
        case "start":
          event[key] = new Date(event[key]);
          break;
        case "stop":
          event[key] = new Date(event[key]);
          break;
      }
      row.push(event[key]);
    }
    result.push(row);
  });
  return result;
};
