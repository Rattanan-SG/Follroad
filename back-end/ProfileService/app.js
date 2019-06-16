const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const app = express();

const config = require("./config/config.js");
global.gConfig = config;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: global.gConfig.jwksUri
  }),
  audience: global.gConfig.audience,
  issuer: global.gConfig.issuer,
  algorithms: ["RS256"]
});

app.get("/api/battles/public", (req, res) => {
  let publicBattles = [1, 2, 3];
  res.json(publicBattles);
});

app.get("/api/battles/private", authCheck, (req, res) => {
  let privateBattles = [999, 998];
  res.json(privateBattles);
});

const PORT = global.gConfig.node_port || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
