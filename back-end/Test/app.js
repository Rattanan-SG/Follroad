const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

const config = require("./config/config.js");
global.gConfig = config;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from Test Service.");
});
app.get("/aaa", (req, res) => {
  axios
    .get(
      `${"http://" +
        global.gConfig.external_event_host +
        "/api/external-event/events"}`
    )
    .then(response => {
      res.send(response.data);
    });
});

const PORT = global.gConfig.node_port || 9000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
