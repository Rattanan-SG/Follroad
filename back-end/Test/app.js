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
app.get("/test", (req, res) => {
  let env = process.env;
  res.send({ data: env });
});
app.get("/test/external-event", (req, res) => {
  axios
    .get(`${global.gConfig.external_event_url + "/events"}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      throw new Error("Higher-level error. : " + error);
    })
    .catch(error => {
      res.json({ error: `${error}` });
    });
});

const PORT = global.gConfig.node_port || 9000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
