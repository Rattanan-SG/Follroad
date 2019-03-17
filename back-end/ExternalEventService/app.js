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
const service = require("./controller/appService");

app.use(cors());
app.use(bodyParser.json());

const job = new CronJob("*/3 * * * *", () => {
  service.updateEventToDatabase();
});

job.start();

app.get("/events", (req, res) => {
  db.getEvents().then(events => {
    res.send(events);
  });
});

app.post("/update", (req, res) => {
  service.updateEventToDatabase().then(out => {
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

const PORT = global.gConfig.node_port || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
