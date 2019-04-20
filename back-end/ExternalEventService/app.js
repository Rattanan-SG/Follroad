const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const config = require("./config/config.js");
global.gConfig = config;
const externalEventRouter = require("./routes/external-event");
const cronJobRouter = require("./routes/cron-job");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/external-event", externalEventRouter);
app.use("/api/external-event/job", cronJobRouter);

const PORT = global.gConfig.node_port || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
