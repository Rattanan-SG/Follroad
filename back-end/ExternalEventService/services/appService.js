const api = require("./iticApi");
const db = require("../database/controller");

function updateEventToDatabase() {
  return Promise.all([db.getEventId(), api.getEvents()])
    .then(response => {
      let databaseEventsEid = response[0].map(x => x.eid);
      let eventFilter = response[1].filter(
        event => !databaseEventsEid.includes(parseInt(event.eid))
      );
      if (eventFilter.length != 0) {
        db.insertEvents(eventFilter);
        console.log(
          `Update data complete '${eventFilter.length}' row : ` +
            new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
        );
      } else {
        console.log(
          `Not hava event to update : ` +
            new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
        );
      }
      return eventFilter.length;
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  updateEventToDatabase
};
