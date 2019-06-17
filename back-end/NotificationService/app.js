const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const config = require("./config/config.js");
global.gConfig = config;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/api/", (req, res) => {
  let publicBattles = [1, 2, 3];
  res.json(publicBattles);
});

const PORT = global.gConfig.node_port || 3002;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
