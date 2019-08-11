const express = require("express");
const api = require("./api");

const router = express.Router();

const { npm_package_name, npm_package_version } = process.env;

router.get("/", (req, res) => {
  res.json(`Hello this is ${npm_package_name}`);
});

router.get("/notification", (req, res) => {
  res.json(`Hello this is ${npm_package_name}`);
});

router.get("/notification/health-check", (req, res) => {
  res.json({
    status: "OK",
    service: npm_package_name,
    version: npm_package_version
  });
});

router.use("/notification/api", api);

router.all("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
    service: npm_package_name,
    version: npm_package_version
  });
});

module.exports = router;
