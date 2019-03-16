const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const CronJob = require("cron").CronJob;
const app = express();

const api = require("./controller/iticApi");
const db = require("./database/controller");

app.use(cors());
app.use(bodyParser.json());

const job = new CronJob("*/3 * * * *", () => {
  updateEventToDatabase();
});
job.start();

app.get("/events", (req, res) => {
  db.getEvents().then(events => {
    res.send(events);
  });
});

app.post("/update", (req, res) => {
  updateEventToDatabase().then(out => {
    res.send({ count: out });
  });
});

app.post("/job/start", (req, res) => {
  job.start();
  console.log("Update data job has start");
  res.sendStatus(200);
});

app.post("/job/stop", (req, res) => {
  job.stop();
  console.log("Update data job has stop");
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

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
