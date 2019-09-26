const express = require("express");
const consumer = require("./consumer");
const geometry = require("./geometry");

const router = express.Router();

const apis = [consumer, geometry];

router.use(apis);

module.exports = router;
