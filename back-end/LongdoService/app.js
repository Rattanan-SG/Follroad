const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const CronJob = require("cron").CronJob;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const job = new CronJob("*/1 * * * *", () => {
  axios
    .get("https://event.longdo.com/feed/json")
    .then(function(response) {
      console.log(response.data[0], new Date());
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/event", (req, res) => {
  axios.get("https://event.longdo.com/feed/json").then(function(response) {
    res.send(response.data);
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
