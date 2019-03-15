const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const CronJob = require("cron").CronJob;
const app = express();

const api = require("./utility/api");
const db = require("./database/controller");

app.use(cors());
app.use(bodyParser.json());

const job = new CronJob("*/1 * * * *", () => {
  api.getEvents().then(events => {
    console.log();
  });
});

app.get("/events", (req, res) => {
  db.getEvents().then(events => {
    console.log(events.length);
    res.send(events);
  });
});

app.get("/test", async (req, res) => {
  const externalEventsEid = await db.getEvents().then(event =>
    event.map(x => {
      return x.eid;
    })
  );

  api.getEvents().then(events => {
    let summaryEvent = [];
    let eventFilter = events.filter(
      event => !externalEventsEid.includes(parseInt(event.eid))
    );
    eventFilter.map(event => {
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
      summaryEvent.push(row);
    });
    db.insertEvents(summaryEvent);
  });
});

app.post("/start", (req, res) => {
  job.start();
  res.send(200);
});

app.post("/stop", (req, res) => {
  job.stop();
  res.send(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // job.start();
  console.log(`Server listening on port ${PORT}...`);
});
