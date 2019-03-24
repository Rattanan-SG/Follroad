const api = require("./iticApi");
const db = require("../database/controller");

function updateEventToDatabase() {
  return Promise.all([db.getEventId(), api.getEvents()])
    .then(response => {
      const databaseEventsEid = response[0].map(x => x.eid);
      // const uniqueValues = removeDuplicates(response[1], "eid");
      const eventFilter = response[1].filter(
        event => !databaseEventsEid.includes(parseInt(event.eid))
      );
      // console.log("-------------");
      // console.log("filter : " + eventFilter.length);
      // console.log("unique : " + uniqueValues.length);
      if (eventFilter.length != 0) {
        db.insertEvents(eventFilter);
        console.log(
          `Update events complete ${eventFilter.length} row : ` +
            new Date().toLocaleString("en-US", {
              timeZone: "Asia/Bangkok"
            })
        );
      } else {
        console.log(
          `Not have events to update : ` +
            new Date().toLocaleString("en-US", {
              timeZone: "Asia/Bangkok"
            })
        );
      }
      return eventFilter.length;
    })
    .catch(err => {
      throw err;
    });
}

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

module.exports = {
  updateEventToDatabase
};
