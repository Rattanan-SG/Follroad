const express = require("express");
const api = require("./api");

const router = express.Router();

const { npm_package_name: service, npm_package_version: version } = process.env;

router.get("/", (req, res) => {
  res.json(`Hello this is ${service}`);
});

router.get("/event", (req, res) => {
  res.json(`Hello this is ${service}`);
});

router.get("/event/health-check", (req, res) => {
  res.json({
    status: "OK",
    service,
    version
  });
});

router.use("/event/api", api);

router.all("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
    service,
    version
  });
});

module.exports = router;
