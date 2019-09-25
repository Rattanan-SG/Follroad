const express = require("express");
const event = require("./event");
const comment = require("./comment");
const feedback = require("./feedback");

const router = express.Router();

const apis = [event, comment, feedback];

router.use(apis);

module.exports = router;
