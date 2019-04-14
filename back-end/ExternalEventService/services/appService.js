const api = require("./iticApi");
const db = require("../database/controller");

async function updateEventToDatabase() {
  return Promise.all([db.getEventId(), api.getEvents()])
    .then(response => {
      const databaseEventsEid = response[0].map(x => x.eid);
      const eventFilter = response[1].filter(
        event => !databaseEventsEid.includes(parseInt(event.eid))
      );
      if (eventFilter.length != 0) {
        return db.insertEvents(eventFilter).then(response => {
          console.log(
            "Update events complete " +
              JSON.stringify(response) +
              " : " +
              new Date().toLocaleString("en-US", {
                timeZone: "Asia/Bangkok"
              })
          );
          return response.affectedRows;
        });
      } else {
        console.log(
          `Not have events to update : ` +
            new Date().toLocaleString("en-US", {
              timeZone: "Asia/Bangkok"
            })
        );
        return 0;
      }
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
