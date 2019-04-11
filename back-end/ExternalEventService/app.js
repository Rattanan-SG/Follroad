const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const CronJob = require("cron").CronJob;
const app = express();

const config = require("./config.json");
const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];
global.gConfig = environmentConfig;

const db = require("./database/controller");
const services = require("./services/appService");

app.use(cors());
app.use(bodyParser.json());

const job = new CronJob("*/3 * * * *", () => {
  services.updateEventToDatabase().catch(err => console.log(err));
});

job.start();

app.get("/events", async (req, res) => {
  let limit = parseInt(req.query.limit);
  let startAt = req.query.startAt;
  let events;
  try {
    if (limit && startAt) {
      events = await db.getEventsHaveLimit(startAt, limit);
    } else {
      events = await db.getEvents();
    }
    res.send(events);
  } catch (err) {
    res.status(500).send({ error: `${err}` });
  }
});

app.get("/events/type/:type", (req, res) => {
  db.getEventByType(req.params.type)
    .then(events => {
      res.send(events);
    })
    .catch(err => {
      res.status(500).send({ error: `${err}` });
    });
});

app.post("/update", (req, res) => {
  services
    .updateEventToDatabase()
    .then(out => {
      res.status(201).send({ count: out });
    })
    .catch(err => {
      res.status(500).send({ error: `${err}` });
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

const PORT = global.gConfig.node_port || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});