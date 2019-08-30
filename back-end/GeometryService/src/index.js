const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const config = require("./config");
global.gConfig = config;

const route = require("./routes");
const errorMiddleware = require("./middleware/error-middleware");

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(route);
app.use(errorMiddleware);

const PORT = global.gConfig.node_port || 3004;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
